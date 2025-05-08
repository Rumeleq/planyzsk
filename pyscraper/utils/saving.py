import asyncio
import json
import os

import aiofiles


async def save_timetables(timetables: dict[str, dict[str, list[tuple[str, str, str]]]], directory: str, tasks: list[asyncio.Task]) -> None:
    """Saves the timetables to the files

    Args:
        timetables (dict[str, dict[str, list[tuple[str, str, str]]]): timetables to save
        directory (str): directory to save the timetables
        tasks (list[asyncio.Task]): list of tasks
    """
    if not os.path.exists(directory):  # if the folder doesn't exist, create it
        os.makedirs(directory)
    for timetable_name in timetables:
        tasks.append(asyncio.create_task(save_timetable(timetable_name, timetables[timetable_name], directory)))


async def save_timetable(timetable_name: str, timetable, directory: str) -> None:
    """Saves the timetable to the file

    Args:
        timetable_name (str): timetable name
        timetable (Any): timetable to save
        directory (str): directory to save the timetable
    """
    async with aiofiles.open(f'{directory}{timetable_name}.json', 'w', encoding='utf-8') as f:
        await f.write(json.dumps(timetable, ensure_ascii=False, indent=4))   # save the timetable to the file
