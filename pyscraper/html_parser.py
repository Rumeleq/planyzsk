import json
import os
import re

from bs4 import BeautifulSoup as bs
from utils.constants import WORDS_TO_ADD_SPACE_AFTER
from utils.constants import WORDS_TO_ADD_SPACE_AFTER_FIRST_CHARACTER
from utils.constants import WORDS_TO_ADD_SPACE_AFTER_SECOND_CHARACTER
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
        lesson_name = re.sub(rf'(?i){re.escape(word)}', f'{word} ', lesson_name)
    for word in WORDS_TO_ADD_SPACE_AFTER_FIRST_CHARACTER:
        lesson_name = re.sub(rf'(?i){re.escape(word)}', f'{word[0]} {word[1:]}', lesson_name)
    for word in WORDS_TO_ADD_SPACE_AFTER_SECOND_CHARACTER:
        lesson_name = re.sub(rf'(?i){re.escape(word)}', f'{word[:2]} {word[2:]}', lesson_name)

    return lesson_name


def parse_json_to_html():
    json_filename = '3D.json'
    grade_name = os.path.splitext(json_filename)[0]
    with open(f'{JSON_PATH}/timetables/grades/3D.json', 'r', encoding='utf-8') as f:
        schedule: dict[str, dict[str, list[list[tuple[str, str, str]]]]] = json.load(f)

    with open(f'{HTML_PATH}/grades_template.html', 'r', encoding='utf-8') as f:
        soup = bs(f, 'html.parser')

    soup.title.string = f'Plan lekcji oddziału - {grade_name}'
    soup.body.span.string = f'{grade_name}'

    for week_day in schedule:
        for school_hour in schedule[week_day]:
            if school_hour is None:
                continue
            for lesson in school_hour:
                subject = lesson[0]
                lesson_name = normalize_lesson_name(subject)
                lesson[0] = lesson_name
                print(lesson)

    with open('test.html', 'w', encoding='utf-8') as f:
        f.write(soup.prettify())


if __name__ == '__main__':
    parse_json_to_html()
