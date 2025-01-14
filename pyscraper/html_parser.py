import json
import os
import re
from bs4 import BeautifulSoup as bs
from utils.constants import WORDS_TO_ADD_SPACE_AFTER
from utils.constants import WORDS_TO_ADD_SPACE_AFTER_FIRST_CHARACTER
from utils.constants import WORDS_TO_ADD_SPACE_AFTER_SECOND_CHARACTER
from utils.constants import N_MAP, O_MAP, S_MAP
from utils.constants import TEACHER_INTIAL_NAME_DICT
from utils.constants import HTML_PATH, JSON_PATH


def normalize_lesson_name(lesson_name: str, *args: str) -> str:
    """
       Normalize lesson name by adding spaces according to predefined rules.

       Args:
           lesson_name (str): The original lesson name to normalize.

       Returns:
           str: Normalized lesson name with appropriate spacing added.
   """
    if args:
        lesson_name = lesson_name.replace(args[0], '')
    for word in WORDS_TO_ADD_SPACE_AFTER:
        regex = rf'({re.escape(word)})(?!j)(?!$)'
        lesson_name = re.sub(regex, r'\1 ', lesson_name)

    for word in WORDS_TO_ADD_SPACE_AFTER_FIRST_CHARACTER:
        regex = rf'({re.escape(word[0])})({re.escape(word[1:])})'
        lesson_name = re.sub(regex, r'\1 \2', lesson_name)

    for word in WORDS_TO_ADD_SPACE_AFTER_SECOND_CHARACTER:
        regex = rf'({re.escape(word[:2])})({re.escape(word[2:])})'
        lesson_name = re.sub(regex, r'\1 \2', lesson_name)

    optional_spaces_around_hyphen = re.compile(r'(\s?-\s?)')
    lesson_name = re.sub(optional_spaces_around_hyphen, ' - ', lesson_name)

    lesson_name = lesson_name.strip()

    return lesson_name


def parse_classroom_json_to_html(json_filename: str) -> None:
    classroom_number = os.path.splitext(json_filename)[0]
    with open(f'{JSON_PATH}/timetables/classrooms/{json_filename}.json', 'r', encoding='utf-8') as f:
        schedule: dict[str, dict[str, list[tuple[str, str, str]]]] = json.load(f)

    with open(f'{HTML_PATH}/timetable_template.html', 'r', encoding='utf-8') as f:
        soup = bs(f, 'html.parser')

    if classroom_number.isnumeric() and len(classroom_number) == 2:
        soup.title.string = f'Plan lekcji sali - s{classroom_number}'
        soup.body.span.string = f's{classroom_number}'
    else:
        soup.title.string = f'Plan lekcji sali - {classroom_number}'
        soup.body.span.string = f'{classroom_number}'

    rows = soup.find_all('tr')[1:]

    for i, week_day in enumerate(schedule):
        for j, school_hour in enumerate(schedule[week_day]):
            if school_hour is None:
                continue

            row = rows[j]
            td = row.find_all('td', class_='l')[i]
            grades: list[str]
            teacher, grades, lesson = school_hour
            lesson_name = normalize_lesson_name(lesson)

            span_o = soup.new_tag('span', class_='o')
            for length, grade in enumerate(grades):
                if length > 0:
                    grade_anchor = soup.new_tag('a', class_='o', href=f'{O_MAP[grade]}.html')
                    grade_anchor.string = grade
                    comma_span = soup.new_tag('span')
                    comma_span.string = ', '
                    span_o.extend([comma_span, grade_anchor])
                else:
                    grade_anchor = soup.new_tag('a', class_='o', href=f'{O_MAP[grade]}.html')
                    grade_anchor.string = grade
                    span_o.append(grade_anchor)

            span_p = soup.new_tag('span', class_='p')
            span_p.string = f' {lesson_name}'
            anchor_n = soup.new_tag('a', class_='n', href=f'{N_MAP[teacher]}.html')
            anchor_n.string = f'{teacher} '

            wrapper_span = soup.new_tag('span')
            td.append(wrapper_span)
            wrapper_span.extend([anchor_n, span_o, span_p])

    with open(f'../dane/{S_MAP[json_filename]}.html', 'w', encoding='utf-8') as f:
        f.write(str(soup))


def parse_teacher_json_to_html(json_filename: str) -> None:
    teacher_intials = os.path.splitext(json_filename)[0]
    teacher_name = TEACHER_INTIAL_NAME_DICT[teacher_intials]
    with open(f'{JSON_PATH}/timetables/teachers/{json_filename}.json', 'r', encoding='utf-8') as f:
        schedule: dict[str, dict[str, list[tuple[str, str, str]]]] = json.load(f)

    with open(f'{HTML_PATH}/timetable_template.html', 'r', encoding='utf-8') as f:
        soup = bs(f, 'html.parser')

    soup.title.string = f'Plan lekcji nauczyciela - {teacher_name} ({teacher_intials})'
    soup.body.span.string = f'{teacher_name} ({teacher_intials})'
    rows = soup.find_all('tr')[1:]

    for i, week_day in enumerate(schedule):
        for j, school_hour in enumerate(schedule[week_day]):
            if school_hour is None:
                continue
            row = rows[j]
            td = row.find_all('td', class_='l')[i]

            grades: list[str]
            grades, subject, classroom = school_hour
            lesson_name = normalize_lesson_name(subject)

            span_o = soup.new_tag('span', class_='o')
            for length, grade in enumerate(grades):
                if length > 0:
                    grade_anchor = soup.new_tag('a', class_='o', href=f'{O_MAP[grade]}.html')
                    grade_anchor.string = grade
                    comma_span = soup.new_tag('span')
                    comma_span.string = ', '
                    span_o.extend([comma_span, grade_anchor])
                else:
                    grade_anchor = soup.new_tag('a', class_='o', href=f'{O_MAP[grade]}.html')
                    grade_anchor.string = grade
                    span_o.append(grade_anchor)

            span_p = soup.new_tag('span', class_='p')
            span_p.string = f' {lesson_name} '
            anchor_s = soup.new_tag('a', class_='s', href=f'{S_MAP[classroom]}.html')
            anchor_s.string = classroom

            wrapper_span = soup.new_tag('span')
            td.append(wrapper_span)
            wrapper_span.extend([span_o, span_p, anchor_s])

    if teacher_name == 'K. Giżyński':
        twitch_link = soup.new_tag('a', href='https://m.twitch.tv/kumi_gaming/home', id='kumi_gaming', style='margin-top: 20px; text-decoration: underline')
        twitch_link.string = 'Twitch Kumi_Gaming'
        soup.body.append(twitch_link)

    with open(f'../dane/{N_MAP[json_filename]}.html', 'w', encoding='utf-8') as f:
        f.write(str(soup))


def parse_grade_json_to_html(json_filename: str) -> None:
    grade_name = os.path.splitext(json_filename)[0]
    with open(f'{JSON_PATH}/timetables/grades/{json_filename}.json', 'r', encoding='utf-8') as f:
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
                lesson_name = normalize_lesson_name(subject, grade_name)

                span_p = soup.new_tag('span', class_='p')
                span_p.string = lesson_name
                anchor_n = soup.new_tag('a', class_='n', href=f'{N_MAP[teacher]}.html')
                anchor_n.string = teacher
                anchor_s = soup.new_tag('a', class_='s', href=f'{S_MAP[classroom]}.html')
                anchor_s.string = classroom

                wrapper_span = soup.new_tag('span')
                if len(school_hour) > 1:
                    if k > 0:
                        br = soup.new_tag('br')
                        wrapper_span.append(br)
                    wrapper_span.attrs['style'] = 'font-size: 85%;'

                td.append(wrapper_span)
                wrapper_span.extend([span_p, anchor_n, anchor_s])

    with open(f'../dane/{O_MAP[json_filename]}.html', 'w', encoding='utf-8') as f:
        f.write(soup.prettify())
