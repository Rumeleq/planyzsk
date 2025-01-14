import asyncio
import json
import os
import re
from bs4 import BeautifulSoup as bs, ResultSet, Tag
from aiohttp import ClientSession
from utils.getting import get_lesson_details
from utils.saving import save_timetables
from utils.constants import JSON_PATH, LESSONS_NUMBER, PLAIN_TEXT_SOLUTION, URL, WEEK_DAYS
from utils.constants import TEACHER_INTIAL_NAME_DICT
from utils.constants import GROUP_REGEX
from html_parser import parse_grade_json_to_html, parse_teacher_json_to_html, parse_classroom_json_to_html
from typing import List


def insert_data_to_teachers(lesson_title: str, lesson_teacher: str, lesson_classroom: str, num_col: int, num_row: int, grade: str) -> None:
    """Puts lesson data into TEACHERS_TIMETABLES dictionary in aprioriate place

    Args:
        lesson_title (str): name of the lesson
        lesson_teacher (str): initials of the teacher
        lesson_classroom (str): number of the classroom
        num_col (int): day of a week
        num_row (int): number of the lesson
        grade (str): just a grade

    Raises:
        ValueError: if the lesson is already in the TEACHERS_TIMETABLES dictionary,
        and it's not the same as the new one (except the grade)
    """
    print(lesson_title, lesson_teacher, lesson_classroom, num_col, num_row, grade)
    if re.search(GROUP_REGEX, lesson_title) is not None:
        grade += lesson_title[-4:]
        lesson_title = lesson_title[:-4]

    if lesson_teacher not in TEACHERS_TIMETABLES:   # if teacher is not in the TEACHERS_TIMETABLES dictionary, add him
        TEACHERS_TIMETABLES[lesson_teacher] = {day: [None for _ in range(LESSONS_NUMBER)] for day in range(WEEK_DAYS)}  # add LESSONS_NUMBER lessons per day

    if not TEACHERS_TIMETABLES[lesson_teacher][num_col][num_row]:  # if the lesson is empty, put it there
        TEACHERS_TIMETABLES[lesson_teacher][num_col][num_row] = ([grade], lesson_title, lesson_classroom)

    elif TEACHERS_TIMETABLES[lesson_teacher][num_col][num_row][1] == lesson_title \
            and TEACHERS_TIMETABLES[lesson_teacher][num_col][num_row][2] == lesson_classroom:  # if the lesson is the same as the new one, just add the grade

        i = 0

        while i < len(TEACHERS_TIMETABLES[lesson_teacher][num_col][num_row][0]) and \
                TEACHERS_TIMETABLES[lesson_teacher][num_col][num_row][0][i] < grade:  # find the place where to put the grade
            i += 1
        TEACHERS_TIMETABLES[lesson_teacher][num_col][num_row][0].insert(i, grade)  # insert the grade
    else:
        raise ValueError(f'Error: {TEACHERS_TIMETABLES[lesson_teacher][num_col][num_row]} != {grade} {lesson_title} {lesson_classroom}')  # if the lesson is different, raise an error


def insert_data_to_classrooms(lesson_title: str, lesson_teacher: str, lesson_classroom: str, num_col: int, num_row: int, grade: str) -> None:
    """Puts lesson data into CLASSROOMS_TIMETABLES dictionary in aprioriate place

    Args:
        lesson_title (str): name of the lesson
        lesson_teacher (str): initials of the teacher
        lesson_classroom (str): number of the classroom
        num_col (int): day of a week
        num_row (int): number of the lesson
        grade (str): just a grade

    Raises:
        ValueError: if the lesson is already in the CLASSROOMS_TIMETABLES dictionary,
        and it's not the same as the new one (except the grade)
    """

    print(lesson_title, lesson_teacher, lesson_classroom, num_col, num_row, grade)
    if re.search(GROUP_REGEX, lesson_title) is not None:
        grade += lesson_title[-4:]
        lesson_title = lesson_title[:-4]
    if lesson_classroom not in CLASSROOMS_TIMETABLES:  # if classroom is not in the CLASSROOMS_TIMETABLES dictionary, add it
        CLASSROOMS_TIMETABLES[lesson_classroom] = {day: [None for _ in range(LESSONS_NUMBER)] for day in range(WEEK_DAYS)}  # add LESSONS_NUMBER lessons per day

    if not CLASSROOMS_TIMETABLES[lesson_classroom][num_col][num_row]:  # if the lesson is empty, put it there
        CLASSROOMS_TIMETABLES[lesson_classroom][num_col][num_row] = (lesson_teacher, [grade], lesson_title)

    elif CLASSROOMS_TIMETABLES[lesson_classroom][num_col][num_row][2] == lesson_title \
            and CLASSROOMS_TIMETABLES[lesson_classroom][num_col][num_row][0] == lesson_teacher:  # if the lesson is the same as the new one, just add the grade

        i = 0
        while i < len(CLASSROOMS_TIMETABLES[lesson_classroom][num_col][num_row][1]) and \
                CLASSROOMS_TIMETABLES[lesson_classroom][num_col][num_row][1][i] < grade:  # find the place where to put the grade
            i += 1
        CLASSROOMS_TIMETABLES[lesson_classroom][num_col][num_row][1].insert(i, grade)  # insert the grade

    # else:
    #    raise ValueError(f'Error: {CLASSROOMS_TIMETABLES[lesson_classroom][num_col][num_row]} != {grade} {lesson_teacher} {lesson_title}')  # if the lesson is different, raise an error


def insert_data_to_grades(lesson_title: str, lesson_teacher: str, lesson_classroom: str, num_col: int, num_row: int, grade: str) -> None:
    """Puts lesson data into GRADES_TIMETABLES dictionary in aprioriate place

    Args:
        lesson_title (str): name of the lesson
        lesson_teacher (str): initials of the teacher
        lesson_classroom (str): number of the classroom
        num_col (int): day of a week
        num_row (int): number of the lesson
        grade (str): just a grade

    Raises:
        None
    """
    if grade not in GRADES_TIMETABLES:  # if grade is not in the GRADES_TIMETABLES dictionary, add it
        GRADES_TIMETABLES[grade] = {day: [None for _ in range(LESSONS_NUMBER)] for day in range(WEEK_DAYS)}  # add LESSONS_NUMBER lessons per day

    if not GRADES_TIMETABLES[grade][num_col][num_row]:  # if the lesson is empty, put it there
        GRADES_TIMETABLES[grade][num_col][num_row] = [(lesson_title, lesson_teacher, lesson_classroom)]

    else:
        GRADES_TIMETABLES[grade][num_col][num_row].append((lesson_title, lesson_teacher, lesson_classroom))


async def get_timetable(session: ClientSession, i: int):
    async with session.get(f'{URL}o{i}.html') as response:  # get the timetable
        timetable_html = bs(await response.text(), 'html.parser')  # parse the timetable
        grade = timetable_html.find('span', class_='tytulnapis').text.split(' ')[0]  # get the grade
        print(grade)  # print the grade so we know the progress

        group_regex = r'-\d/\d'
        for td in timetable_html.find_all('td', class_='l'):
            td_text = td.get_text()
            group_regex_td_result: List[str] = re.findall(group_regex, td_text)
            group_regex_span_result: bool = False
            spans_in_td = td.find_all('span', class_='p')
            for i, span in enumerate(spans_in_td):
                if span.get_text().startswith('#'):
                    spans_in_td.pop(i)

            for i, result in enumerate(group_regex_td_result):
                if re.search(group_regex, spans_in_td[i].get_text()):
                    group_regex_span_result = True
                if group_regex_td_result is not None and group_regex_span_result is False:
                    spans_in_td[i].string += result

        row: Tag
        for row_num, row in enumerate(timetable_html.find('table', class_='tabela')
                                                    .find_all('tr')[1:]):  # iterate over the lesson numbers (rows)
            col: Tag
            for col_num, col in enumerate(row.find_all('td')[2:]):  # iterate over the days (columns)
                col_spans: ResultSet[Tag] = col.find_all('span', recursive=False)  # get the spans from the column (the data is stored in spans, exept the plain text)
                if len(col_spans) == 0:  # no spans - plain text case
                    if col.text == '\xa0':  # if empty, skip
                        continue
                    if grade not in PLAIN_TEXT:  # if not present, add PLAIN_TEXT[grade][col_num][row_num] entry
                        PLAIN_TEXT[grade] = dict()
                    if col_num not in PLAIN_TEXT[grade]:  # same as above for the column
                        PLAIN_TEXT[grade][col_num] = dict()
                    PLAIN_TEXT[grade][col_num][row_num] = col.text  # add the plain text value to the mentioned entry

                    if col.text not in PLAIN_TEXT_SOLUTION:  # if the plain text is not in the PLAIN_TEXT_SOLUTION dictionary, raise an error (if so probably the file is outdated)
                        raise ValueError(f'Error: {grade}/{col_num}/{row_num}: {col.text} not in PLAIN_TEXT_SOLUTION')
                    if PLAIN_TEXT_SOLUTION[col.text] is None:  # if the plain text solution is None, skip it (I considered it an unnecessary data)
                        continue
                    else:  # if the plain text is in the PLAIN_TEXT_SOLUTION dictionary, iterate over the spans and put the data in the dictionaries
                        for span in PLAIN_TEXT_SOLUTION[col.text].split('/'):
                            insert_data_to_teachers(*(w := span.split(' ')), col_num, row_num, grade)
                            insert_data_to_classrooms(*w, col_num, row_num, grade)
                            insert_data_to_grades(*w, col_num, row_num, grade)

                elif len(col_spans) == 3:  # if there are 3 spans, put the data in the Dictionaries (the default case)
                    try:
                        insert_data_to_teachers(*(w := get_lesson_details(col_spans)), col_num, row_num, grade)
                    except KeyError as e:
                        print(f'KeyError: {e}; {col_num, row_num, grade}')
                        continue
                    insert_data_to_classrooms(*w, col_num, row_num, grade)
                    insert_data_to_grades(*w, col_num, row_num, grade)
                elif len(col_spans) == 2:  # if there are 2 spans, iterate over it and put the data in the Dictionaries (group lesson case)
                    for span in col_spans:
                        insert_data_to_teachers(*(w := get_lesson_details(span.find_all('span'))), col_num, row_num, grade)
                        insert_data_to_classrooms(*w, col_num, row_num, grade)
                        insert_data_to_grades(*w, col_num, row_num, grade)
                elif len(col_spans) == 1:   # if there is only one span, it's a group lesson with one group (half of the class case)
                    insert_data_to_teachers(*(w := get_lesson_details(col_spans[0].find_all('span', recursive=False))), col_num, row_num, grade)
                    insert_data_to_classrooms(*w, col_num, row_num, grade)
                    insert_data_to_grades(*w, col_num, row_num, grade)
                else:  # if there are more than 3 spans, iterate over it, organize spans into groups of 3 and put the data in the Dictionaries (more than two groups case)
                    it = iter(col_spans)
                    for span in zip(it, it, it):
                        insert_data_to_teachers(*(w := get_lesson_details(span)), col_num, row_num, grade)
                        insert_data_to_classrooms(*w, col_num, row_num, grade)
                        insert_data_to_grades(*w, col_num, row_num, grade)


async def find_grades_number():
    """Find the total number grades to get the timetables from"""
    low, high = 0, 50

    while low < high:
        mid = (low + high) // 2
        test_url = f'{URL}o{mid}.html'
        try:
            async with ClientSession() as session:
                async with session.get(test_url, allow_redirects=False) as page_response:
                    if page_response.status == 200:
                        low = mid + 1
                    else:
                        high = mid
        except Exception as e:
            print(f"Unexpected error for {test_url}: {type(e).__name__} - {e}")
            break

    return low - 1


def write_filenames_map_to_json(filenames: list[str], prefix: str) -> None:
    filenames_map = {
        filename : f'{prefix}{index + 1}'
        for index, filename in enumerate(sorted(filenames))
    }

    with open(f'{JSON_PATH}{prefix}_map.json', 'w', encoding='utf-8') as f:
        json.dump(filenames_map, f, ensure_ascii=False, indent=4)


def write_teacher_map_sorted_by_last_name_to_json(teachers_filenames: list[str]) -> None:
    sorted_teachers_dict = dict(
        sorted(
            TEACHER_INTIAL_NAME_DICT.items(),
            key=lambda x: x[1].split('. ')[1]
        )
    )

    sorted_teacher_filenames = sorted(
        teachers_filenames,
        key=lambda filename: list(sorted_teachers_dict.keys()).index(filename)
    )

    teachers_filenames_map = {
        initials : f'n{index + 1}'
        for index, initials in enumerate(sorted_teacher_filenames)
    }

    with open(f'{JSON_PATH}n_map.json', 'w', encoding='utf-8') as f:
        json.dump(teachers_filenames_map, f, ensure_ascii=False, indent=4)


async def main():
    # getting timetables
    tasks: list[asyncio.Task] = list()
    async with ClientSession() as session:
        grades_number: int = await find_grades_number()
        print(grades_number)
        for i in range(1, grades_number + 1):
            tasks.append(asyncio.create_task(get_timetable(session, i)))  # create tasks for each timetable
        await asyncio.gather(*tasks)

    tasks.clear()

    # saving teachers' timetables
    path = f'{JSON_PATH}timetables/teachers/'
    await save_timetables(TEACHERS_TIMETABLES, path, tasks)

    # saving classrooms' timetables
    path = f'{JSON_PATH}timetables/classrooms/'
    await save_timetables(CLASSROOMS_TIMETABLES, path, tasks)
    
    # saving grades' timetables
    path = f'{JSON_PATH}timetables/grades/'
    await save_timetables(GRADES_TIMETABLES, path, tasks)
    
    await asyncio.gather(*tasks)

    # saving plain text
    with open(f'{JSON_PATH}plain_text.json', 'w', encoding='utf-8') as f:
        json.dump(PLAIN_TEXT, f, ensure_ascii=False, indent=4, sort_keys=True)  # save the PLAIN_TEXT dictionary to the file (used for creating PLAIN_TEXT_SOLUTION in other program)

    grades_json_files = [f'{JSON_PATH}timetables/grades/{file}'.split('/')[-1].split('.')[0]
                         for file in os.listdir(f'{JSON_PATH}timetables/grades/')]
    teachers_json_files = [f'{JSON_PATH}timetables/teachers/{file}'.split('/')[-1].split('.')[0]
                           for file in os.listdir(f'{JSON_PATH}timetables/teachers/')]
    classrooms_json_files = [f'{JSON_PATH}timetables/classrooms/{file}'.split('/')[-1].split('.')[0]
                             for file in os.listdir(f'{JSON_PATH}timetables/classrooms/')]

    write_filenames_map_to_json(grades_json_files, 'o')
    write_teacher_map_sorted_by_last_name_to_json(teachers_json_files)
    write_filenames_map_to_json(classrooms_json_files, 's')

    for file in grades_json_files:
        parse_grade_json_to_html(file)
    for file in teachers_json_files:
        parse_teacher_json_to_html(file)
    for file in classrooms_json_files:
        parse_classroom_json_to_html(file)


if __name__ == '__main__':
    # tiemetables dictionaries
    TEACHERS_TIMETABLES: dict[str, dict[str, list[tuple[list[str], str, str]]]] = dict()    # Variable to store teachers timetables {teacher: {day: [lesson1, lesson2, ...]}}
    CLASSROOMS_TIMETABLES: dict[str, dict[str, list[tuple[str, list[str], str]]]] = dict()  # Variable to store classrooms timetables {classroom: {day: [lesson1, lesson2, ...]}}
    GRADES_TIMETABLES: dict[str, dict[str, list[list[tuple[str, str, str]]]]] = dict()      # Variable to store grades timetables {grade: {day: [lesson1, lesson2, ...]}}
    PLAIN_TEXT: dict[str, dict[str, dict[str, str]]] = dict()                               # Variable to store plain text lessons (later exported and used in other program to get PLAIN_TEXT_SOLUTION)
    # {grade: {day: {lesson: lesson_text}}}

    folder_paths = ['../dane/', f'{JSON_PATH}timetables/grades/', f'{JSON_PATH}timetables/teachers/', f'{JSON_PATH}timetables/classrooms/']
    for folder_path in folder_paths:
        for file_name in os.listdir(folder_path):
            file_path = os.path.join(folder_path, file_name)
            if os.path.isfile(file_path):
                os.remove(file_path)

    asyncio.run(main())
