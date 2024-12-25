import json
import os
import re
from bs4 import BeautifulSoup as bs
from utils.constants import WORDS_TO_ADD_SPACE_AFTER
from utils.constants import WORDS_TO_ADD_SPACE_AFTER_FIRST_CHARACTER
from utils.constants import WORDS_TO_ADD_SPACE_AFTER_SECOND_CHARACTER
from utils.constants import TEACHER_INTIAL_NAME_DICT
from utils.constants import HTML_PATH
from utils.constants import JSON_PATH


def normalize_lesson_name(lesson_name: str) -> str:
    """
       Normalize lesson name by adding spaces according to predefined rules.

       Args:
           lesson_name (str): The original lesson name to normalize.

       Returns:
           str: Normalized lesson name with appropriate spacing added.
   """
    for word in WORDS_TO_ADD_SPACE_AFTER:
        regex = rf'({re.escape(word)})(?!j)(?!$)'
        lesson_name = re.sub(regex, r'\1 ', lesson_name)

    for word in WORDS_TO_ADD_SPACE_AFTER_FIRST_CHARACTER:
        regex = rf'({re.escape(word[0])})({re.escape(word[1:])})'
        lesson_name = re.sub(regex, r'\1 \2', lesson_name)

    for word in WORDS_TO_ADD_SPACE_AFTER_SECOND_CHARACTER:
        regex = rf'({re.escape(word[:2])})({re.escape(word[2:])})'
        lesson_name = re.sub(regex, r'\1 \2', lesson_name)

    lesson_name = lesson_name.strip()

    return lesson_name


def parse_classroom_json_to_html(json_filename: str) -> None:
    pass


def parse_teacher_json_to_html(json_filename: str) -> None:
    teacher_intials = os.path.splitext(json_filename)[0]
    teacher_name = TEACHER_INTIAL_NAME_DICT[teacher_intials]
    with open(f'{JSON_PATH}/timetables/teachers/{json_filename}', 'r', encoding='utf-8') as f:
        schedule: dict[str, dict[str, list[tuple[str, str, str]]]] = json.load(f)

    with open(f'{HTML_PATH}/timetable_template.html', 'r', encoding='utf-8') as f:
        soup = bs(f, 'html.parser')

    soup.title.string = f'Plan lekcji nauczyciela - {teacher_name} ({teacher_intials})'

    with open('test.html', 'w', encoding='utf-8') as f:
        f.write(soup.prettify())


def parse_grade_json_to_html(json_filename: str) -> None:
    grade_name = os.path.splitext(json_filename)[0]
    with open(f'{JSON_PATH}/timetables/grades/{json_filename}', 'r', encoding='utf-8') as f:
        schedule: dict[str, dict[str, list[list[tuple[str, str, str]]]]] = json.load(f)

    with open(f'{HTML_PATH}/timetable_template.html', 'r', encoding='utf-8') as f:
        soup = bs(f, 'html.parser')

    soup.title.string = f'Plan lekcji oddziału - {grade_name}'
    soup.body.span.string = f'{grade_name}'
    rows = soup.find_all('tr')[1:]

    for i, week_day in enumerate(schedule):
        for j, school_hour in enumerate(schedule[week_day]):
            if school_hour is None:
                continue

            row = rows[j]
            td = row.find_all('td', class_='l')[i]

            for k, lesson in enumerate(school_hour):
                subject, teacher, classroom = lesson
                lesson_name = normalize_lesson_name(subject)
                lesson[0] = lesson_name
                print(lesson)

                span_p = soup.new_tag('span', class_='p')
                span_p.string = lesson_name
                anchor_n = soup.new_tag('a', class_='n')
                anchor_n.string = teacher
                anchor_s = soup.new_tag('a', class_='s')
                anchor_s.string = classroom

                wrapper_span = soup.new_tag('span')
                if len(school_hour) > 1:
                    if k > 0:
                        br = soup.new_tag('br')
                        wrapper_span.append(br)
                    wrapper_span.attrs['style'] = 'font-size: 85%;'

                td.append(wrapper_span)
                wrapper_span.extend([span_p, anchor_n, anchor_s])

    with open('test.html', 'w', encoding='utf-8') as f:
        f.write(soup.prettify())


if __name__ == '__main__':
    # parse_grade_json_to_html('3D.json')
    parse_teacher_json_to_html('AB.json')
