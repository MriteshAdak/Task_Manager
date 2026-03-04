from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from typing import Optional


@dataclass
class Task:
    id: str
    title: str
    status: str
    due_date: Optional[datetime] = None
