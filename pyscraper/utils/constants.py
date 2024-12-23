import json


JSON_PATH = 'JSON/'  # path to the JSON files
URL = 'https://www.zsk.poznan.pl/plany_lekcji/2023plany/technikum/plany/'  # URL to the timetables
WEEK_DAYS = 5
LESSONS_NUMBER = 11
HTML_PATH = 'utils'

WORDS_TO_ADD_SPACE_AFTER = ['Język', 'Rysunek', 'Pracownia', 'Tworzenie', 'aplikacji', 'Biznes', 'Zajęcia', 'Systemy', 'Wychowanie', 'Programowanie', 'baz', 'programowania', 'Projektowanie', 'Eksploatacja', 'handlowa', 'Działalność', 'usługowa', 'Testowanie', 'dokumentowanie', 'Technika', 'ruchu', 'projektowania', 'danych', 'Historia', 'fizyczne', 'internetowych', 'Informatyka', 'obiektowego', 'angielski', 'Podstawy', 'hiszpański', 'niemiecki', 'Elektrotechnika', 'Urządzenia', 'instalacje', 'urządzeń', 'montażu', 'Układy', 'elektryczne', 'elektryczna', 'Bezpieczeństwo', 'higiena', 'techniki', 'systemów', 'sieci', 'witryn', 'Edukacja', 'dla', 'podstaw', 'utrzymania', 'Pomiary', 'Sieci', 'podstacje', 'trakcyjne', 'elektroniczne', 'instalacji', 'Maszyny', 'urządzenia', 'testowania', 'dokumentowania', 'Kompetencje', 'Witryny', 'aplikacje', 'automatyki', 'Technologie', 'pomiary', 'DSDI', 'Instalacje', 'Wiedza', 'społeczeństwie', 'Przygotowanie', 'praktyczne', 'zawodu', 'maszynisty', 'Organizacja', 'przewozów', 'kolejowych', 'Odprawa', 'pociągów', 'stacji', 'DSD', 'Infrastruktura', 'komputerowe', 'technologii', 'pomiarów', 'sterowania', 'ruchem', 'Bazy', 'Kolejowe', 'pojazdy', 'taboru', 'Tabor', 'elektrycznych', 'pojazdów', 'eksploatacji', 'środków', 'transportu', 'organizacji', 'pracy', 'Niemiecki']
WORDS_TO_ADD_SPACE_AFTER_FIRST_CHARACTER = ['zwychowawcą', 'izarządzanie', 'iurządzeń', 'idokumentowanie', 'ielektronika', 'ielektroniczna', 'iinstalacje', 'ihigiena', 'ielektroniczne', 'iutrzymania', 'ipodstacje', 'iurządzenia', 'idokumentowania', 'iaplikacje', 'wautomatyce', 'ipomiary', 'ospołeczeństwie', 'ipomiarów']
WORDS_TO_ADD_SPACE_AFTER_SECOND_CHARACTER = ['dozawodu', 'nastacji']

with open(f'{JSON_PATH}lessons.json', 'r', encoding='utf-8') as f:
    LESSONS: dict[str, str] = json.load(f)  # Constant to replace corrupted lesson names {corrupted_lesson: lesson_name}
with open(f'{JSON_PATH}teachers.json', 'r', encoding='utf-8') as f:
    TEACHERS: dict[str, str] = json.load(f)  # Constant to replace corrupted teacher names {corrupted_teacher: teacher_name}
with open(f'{JSON_PATH}plain_text_solution.json', 'r', encoding='utf-8') as f:
    PLAIN_TEXT_SOLUTION: dict[str, str] = json.load(f)  # Constant to replace plain text lessons {pt_lesson: lesson_data}
