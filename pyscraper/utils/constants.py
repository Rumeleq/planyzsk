import json

JSON_PATH = "JSON/"  # path to the JSON files
URL = "https://www.zsk.poznan.pl/plany_lekcji/2023plany/plany/"  # URL to the timetables
WEEK_DAYS = 5
LESSONS_NUMBER = 11
HTML_PATH = "utils"
GROUP_REGEX = r"-\d/\d"

WORDS_TO_ADD_SPACE_AFTER: list[str] = [
    "Język",
    "Rysunek",
    "Pracownia",
    "Tworzenie",
    "aplikacji",
    "Biznes",
    "Zajęcia",
    "Systemy",
    "Wychowanie",
    "Programowanie",
    "baz",
    "programowania",
    "Projektowanie",
    "Eksploatacja",
    "handlowa",
    "Działalność",
    "usługowa",
    "Testowanie",
    "dokumentowanie",
    "Technika",
    "ruchu",
    "projektowania",
    "danych",
    "Historia",
    "fizyczne",
    "internetowych",
    "Informatyka",
    "obiektowego",
    "angielski",
    "Podstawy",
    "hiszpański",
    "niemiecki",
    "Elektrotechnika",
    "Urządzenia",
    "instalacje",
    "urządzeń",
    "montażu",
    "Układy",
    "elektryczne",
    "elektryczna",
    "Bezpieczeństwo",
    "higiena",
    "techniki",
    "systemów",
    "sieci",
    "witryn",
    "Edukacja",
    "dla",
    "podstaw",
    "utrzymania",
    "Pomiary",
    "Sieci",
    "podstacje",
    "trakcyjne",
    "elektroniczne",
    "instalacji",
    "Maszyny",
    "urządzenia",
    "testowania",
    "dokumentowania",
    "Kompetencje",
    "Witryny",
    "aplikacje",
    "automatyki",
    "Technologie",
    "pomiary",
    "DSDI",
    "Instalacje",
    "Wiedza",
    "społeczeństwie",
    "Przygotowanie",
    "praktyczne",
    "zawodu",
    "maszynisty",
    "Organizacja",
    "przewozów",
    "kolejowych",
    "Odprawa",
    "pociągów",
    "stacji",
    "DSD",
    "Infrastruktura",
    "komputerowe",
    "technologii",
    "pomiarów",
    "sterowania",
    "ruchem",
    "Bazy",
    "Kolejowe",
    "pojazdy",
    "taboru",
    "Tabor",
    "elektrycznych",
    "pojazdów",
    "eksploatacji",
    "środków",
    "transportu",
    "organizacji",
    "pracy",
    "Niemiecki",
    "Matematyka",
]
WORDS_TO_ADD_SPACE_AFTER_FIRST_CHARACTER: list[str] = [
    "zwychowawcą",
    "izarządzanie",
    "iurządzeń",
    "idokumentowanie",
    "ielektronika",
    "ielektroniczna",
    "iinstalacje",
    "ihigiena",
    "ielektroniczne",
    "iutrzymania",
    "ipodstacje",
    "iurządzenia",
    "idokumentowania",
    "iaplikacje",
    "wautomatyce",
    "ipomiary",
    "ospołeczeństwie",
    "ipomiarów",
]
WORDS_TO_ADD_SPACE_AFTER_SECOND_CHARACTER: list[str] = ["dozawodu", "nastacji"]

with open(f"{JSON_PATH}/resources/initials_name_dict.json", "r", encoding="utf-8") as f:
    TEACHER_INTIAL_NAME_DICT: dict[str, str] = json.load(
        f
    )  # Constant to replace initials with full names {initials: full_name}
with open(f"{JSON_PATH}/resources/corrupted_lessons.json", "r", encoding="utf-8") as f:
    C_LESSONS: dict[str, str] = json.load(
        f
    )  # Constant to replace corrupted lesson names {corrupted_lesson: lesson_name}
with open(f"{JSON_PATH}/resources/corrupted_teachers.json", "r", encoding="utf-8") as f:
    C_TEACHERS: dict[str, str] = json.load(
        f
    )  # Constant to replace corrupted teacher names {corrupted_teacher: teacher_name}
with open(
    f"{JSON_PATH}/resources/plain_text_solution.json", "r", encoding="utf-8"
) as f:
    PLAIN_TEXT_SOLUTION: dict[str, str] = json.load(
        f
    )  # Constant to replace plain text lessons {pt_lesson: lesson_data}


def get_o_map() -> dict[str, str]:
    """Get the O_MAP constant

    Returns:
        dict[str, str]: O_MAP constant
    """
    with open(f"{JSON_PATH}/resources/o_map.json", "r", encoding="utf-8") as f:
        O_MAP: dict[str, str] = json.load(f)
    return O_MAP


def get_n_map() -> dict[str, str]:
    """Get the N_MAP constant

    Returns:
        dict[str, str]: N_MAP constant
    """
    with open(f"{JSON_PATH}/resources/n_map.json", "r", encoding="utf-8") as f:
        N_MAP: dict[str, str] = json.load(f)
    return N_MAP


def get_s_map() -> dict[str, str]:
    """Get the S_MAP constant

    Returns:
        dict[str, str]: S_MAP constant
    """
    with open(f"{JSON_PATH}/resources/s_map.json", "r", encoding="utf-8") as f:
        S_MAP: dict[str, str] = json.load(f)
    return S_MAP
