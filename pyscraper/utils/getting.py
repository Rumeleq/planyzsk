from bs4 import ResultSet, Tag
from pyscraper.utils.constants import LESSONS, TEACHERS


def get_lesson_details(span: ResultSet[Tag]):
    """extracts lesson details from spans

    Args:
        span (ResultSet[Tag]): a result of bs.find_all('span', recursive=False) method. 
        It should contain 3 spans with lesson title {lesson_title-group},
        teacher {teacher_initials} and classroom {classroom_number}

    Returns:
        tuple[str, str, str]: returns a tuple with lesson title,
        teacher and classroom in string format
    """
    try:
        lesson_title: str = w if (w := span[0].text) not in LESSONS else LESSONS[w]  # if lesson is corrupted, replace with correct one
        lesson_teacher: str = w if (w := span[1].text)[0] != '#' else TEACHERS[w]  # if teacher is corrupted, replace with correct one
        lesson_classroom: str = span[2].text
    except KeyError as e:
        print(f'KeyError: {e}; {span}')
        raise e
    return lesson_title, lesson_teacher, lesson_classroom
