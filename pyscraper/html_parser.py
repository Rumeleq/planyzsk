import json
import os
from bs4 import BeautifulSoup as bs
from utils.constants import HTML_PATH
from utils.constants import JSON_PATH


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
                subject, teacher, room = lesson
                print(f'{subject} {teacher} {room}')

    with open('test.html', 'w', encoding='utf-8') as f:
        f.write(soup.prettify())


if __name__ == '__main__':
    parse_json_to_html()
