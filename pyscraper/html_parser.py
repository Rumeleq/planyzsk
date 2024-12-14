import json
from enum import Enum
from bs4 import BeautifulSoup as bs
from utils.constants import HTML_PATH
from utils.constants import JSON_PATH


class WeekDays(Enum):
    MONDAY = 0
    TUESDAY = 1
    WEDNESDAY = 2
    THURSDAY = 3
    FRIDAY = 4


def parse_json_to_html():
    with open(f'{JSON_PATH}/timetables/grades/3D.json', 'r', encoding='utf-8') as f:
        data: dict[str, dict[str, list[list[tuple[str, str, str]]]]] = json.load(f)

    with open(f'{HTML_PATH}/grades_template.html', 'r', encoding='utf-8') as f:
        soup = bs(f, 'html.parser')
        print(soup.prettify())

    with open('test.html', 'w', encoding='utf-8') as f:
        f.write(soup.prettify())


if __name__ == '__main__':
    parse_json_to_html()
