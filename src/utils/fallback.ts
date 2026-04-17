export interface BackupQuestion {
  equation: string;
  answer: number;
  difficulty: string;
  hint: string;
  mode: string;
  grade: string;
}

export const fallbackQuestions: BackupQuestion[] = [
  {
    "mode": "addition",
    "grade": "elementary",
    "equation": "5 + 3",
    "answer": 8,
    "difficulty": "easy",
    "hint": "Count up from 5"
  },
  {
    "mode": "addition",
    "grade": "elementary",
    "equation": "12 + 7",
    "answer": 19,
    "difficulty": "easy",
    "hint": "Think: 12 + 8 - 1"
  },
  {
    "mode": "addition",
    "grade": "elementary",
    "equation": "23 + 15",
    "answer": 38,
    "difficulty": "medium",
    "hint": "Think: 23 + 10 + 5"
  },
  {
    "mode": "addition",
    "grade": "elementary",
    "equation": "47 + 38",
    "answer": 85,
    "difficulty": "hard",
    "hint": "Think: 47 + 40 - 2"
  },
  {
    "mode": "addition",
    "grade": "elementary",
    "equation": "18 + 9",
    "answer": 27,
    "difficulty": "easy",
    "hint": "Think: 18 + 10 - 1"
  },
  {
    "mode": "addition",
    "grade": "elementary",
    "equation": "34 + 22",
    "answer": 56,
    "difficulty": "medium",
    "hint": "Think: 34 + 20 + 2"
  },
  {
    "mode": "addition",
    "grade": "elementary",
    "equation": "56 + 29",
    "answer": 85,
    "difficulty": "hard",
    "hint": "Think: 56 + 30 - 1"
  },
  {
    "mode": "subtraction",
    "grade": "elementary",
    "equation": "15 - 8",
    "answer": 7,
    "difficulty": "easy",
    "hint": "Count back from 15"
  },
  {
    "mode": "subtraction",
    "grade": "elementary",
    "equation": "42 - 17",
    "answer": 25,
    "difficulty": "medium",
    "hint": "Think: 42 - 20 + 3"
  },
  {
    "mode": "subtraction",
    "grade": "elementary",
    "equation": "86 - 49",
    "answer": 37,
    "difficulty": "hard",
    "hint": "Think: 86 - 50 + 1"
  },
  {
    "mode": "subtraction",
    "grade": "elementary",
    "equation": "20 - 7",
    "answer": 13,
    "difficulty": "easy",
    "hint": "Think of a number line"
  },
  {
    "mode": "subtraction",
    "grade": "elementary",
    "equation": "33 - 14",
    "answer": 19,
    "difficulty": "medium",
    "hint": "Think: 33 - 10 - 4"
  },
  {
    "mode": "subtraction",
    "grade": "elementary",
    "equation": "72 - 38",
    "answer": 34,
    "difficulty": "hard",
    "hint": "Think: 72 - 40 + 2"
  },
  {
    "mode": "multiplication",
    "grade": "elementary",
    "equation": "4 × 5",
    "answer": 20,
    "difficulty": "easy",
    "hint": "Count by 5s four times"
  },
  {
    "mode": "multiplication",
    "grade": "elementary",
    "equation": "7 × 6",
    "answer": 42,
    "difficulty": "medium",
    "hint": "Think: 7 × 5 + 7"
  },
  {
    "mode": "multiplication",
    "grade": "elementary",
    "equation": "9 × 8",
    "answer": 72,
    "difficulty": "hard",
    "hint": "Think: 10 × 8 - 8"
  },
  {
    "mode": "multiplication",
    "grade": "elementary",
    "equation": "6 × 3",
    "answer": 18,
    "difficulty": "easy",
    "hint": "Count by 6s three times"
  },
  {
    "mode": "multiplication",
    "grade": "elementary",
    "equation": "8 × 7",
    "answer": 56,
    "difficulty": "medium",
    "hint": "Think: 8 × 5 + 16"
  },
  {
    "mode": "multiplication",
    "grade": "elementary",
    "equation": "7 × 9",
    "answer": 63,
    "difficulty": "hard",
    "hint": "Think: 7 × 10 - 7"
  },
  {
    "mode": "division",
    "grade": "elementary",
    "equation": "24 ÷ 6",
    "answer": 4,
    "difficulty": "easy",
    "hint": "How many 6s make 24?"
  },
  {
    "mode": "division",
    "grade": "elementary",
    "equation": "56 ÷ 7",
    "answer": 8,
    "difficulty": "medium",
    "hint": "Think: 7 times what equals 56?"
  },
  {
    "mode": "division",
    "grade": "elementary",
    "equation": "81 ÷ 9",
    "answer": 9,
    "difficulty": "hard",
    "hint": "What squared equals 81?"
  },
  {
    "mode": "division",
    "grade": "elementary",
    "equation": "30 ÷ 5",
    "answer": 6,
    "difficulty": "easy",
    "hint": "5 times what equals 30?"
  },
  {
    "mode": "division",
    "grade": "elementary",
    "equation": "48 ÷ 8",
    "answer": 6,
    "difficulty": "medium",
    "hint": "Think: 8 times 6"
  },
  {
    "mode": "division",
    "grade": "elementary",
    "equation": "64 ÷ 8",
    "answer": 8,
    "difficulty": "hard",
    "hint": "What squared equals 64?"
  },
  {
    "mode": "addition",
    "grade": "middle",
    "equation": "127 + 89",
    "answer": 216,
    "difficulty": "easy",
    "hint": "Think: 127 + 90 - 1"
  },
  {
    "mode": "addition",
    "grade": "middle",
    "equation": "234 + 156",
    "answer": 390,
    "difficulty": "medium",
    "hint": "Think: 234 + 160 - 4"
  },
  {
    "mode": "addition",
    "grade": "middle",
    "equation": "456 + 389",
    "answer": 845,
    "difficulty": "hard",
    "hint": "Think: 456 + 400 - 11"
  },
  {
    "mode": "addition",
    "grade": "middle",
    "equation": "178 + 92",
    "answer": 270,
    "difficulty": "easy",
    "hint": "Think: 178 + 100 - 8"
  },
  {
    "mode": "addition",
    "grade": "middle",
    "equation": "345 + 267",
    "answer": 612,
    "difficulty": "medium",
    "hint": "Think: 345 + 270 - 3"
  },
  {
    "mode": "addition",
    "grade": "middle",
    "equation": "678 + 445",
    "answer": 1123,
    "difficulty": "hard",
    "hint": "Think: 678 + 450 - 5"
  },
  {
    "mode": "subtraction",
    "grade": "middle",
    "equation": "203 - 87",
    "answer": 116,
    "difficulty": "easy",
    "hint": "Think: 203 - 90 + 3"
  },
  {
    "mode": "subtraction",
    "grade": "middle",
    "equation": "342 - 158",
    "answer": 184,
    "difficulty": "medium",
    "hint": "Think: 342 - 160 + 2"
  },
  {
    "mode": "subtraction",
    "grade": "middle",
    "equation": "567 - 289",
    "answer": 278,
    "difficulty": "hard",
    "hint": "Think: 567 - 300 + 11"
  },
  {
    "mode": "subtraction",
    "grade": "middle",
    "equation": "256 - 124",
    "answer": 132,
    "difficulty": "easy",
    "hint": "Think: 256 - 120 - 4"
  },
  {
    "mode": "subtraction",
    "grade": "middle",
    "equation": "423 - 167",
    "answer": 256,
    "difficulty": "medium",
    "hint": "Think: 423 - 170 + 3"
  },
  {
    "mode": "subtraction",
    "grade": "middle",
    "equation": "734 - 398",
    "answer": 336,
    "difficulty": "hard",
    "hint": "Think: 734 - 400 + 2"
  },
  {
    "mode": "multiplication",
    "grade": "middle",
    "equation": "15 × 12",
    "answer": 180,
    "difficulty": "medium",
    "hint": "Think: 15 × 10 + 15 × 2"
  },
  {
    "mode": "multiplication",
    "grade": "middle",
    "equation": "23 × 11",
    "answer": 253,
    "difficulty": "hard",
    "hint": "Think: 23 × 10 + 23"
  },
  {
    "mode": "multiplication",
    "grade": "middle",
    "equation": "12 × 14",
    "answer": 168,
    "difficulty": "medium",
    "hint": "Think: 12 × 10 + 12 × 4"
  },
  {
    "mode": "multiplication",
    "grade": "middle",
    "equation": "18 × 15",
    "answer": 270,
    "difficulty": "hard",
    "hint": "Think: 18 × 10 + 18 × 5"
  },
  {
    "mode": "multiplication",
    "grade": "middle",
    "equation": "16 × 13",
    "answer": 208,
    "difficulty": "medium",
    "hint": "Think: 16 × 10 + 16 × 3"
  },
  {
    "mode": "multiplication",
    "grade": "middle",
    "equation": "21 × 19",
    "answer": 399,
    "difficulty": "hard",
    "hint": "Think: 21 × 20 - 21"
  },
  {
    "mode": "division",
    "grade": "middle",
    "equation": "144 ÷ 12",
    "answer": 12,
    "difficulty": "medium",
    "hint": "What squared equals 144?"
  },
  {
    "mode": "division",
    "grade": "middle",
    "equation": "156 ÷ 13",
    "answer": 12,
    "difficulty": "medium",
    "hint": "Think: 13 × 12"
  },
  {
    "mode": "division",
    "grade": "middle",
    "equation": "192 ÷ 16",
    "answer": 12,
    "difficulty": "hard",
    "hint": "Think: 16 × 12"
  },
  {
    "mode": "division",
    "grade": "middle",
    "equation": "210 ÷ 14",
    "answer": 15,
    "difficulty": "medium",
    "hint": "Think: 14 × 15"
  },
  {
    "mode": "division",
    "grade": "middle",
    "equation": "182 ÷ 13",
    "answer": 14,
    "difficulty": "hard",
    "hint": "Think: 13 × 14"
  },
  {
    "mode": "fractions",
    "grade": "middle",
    "equation": "1/2 + 1/2",
    "answer": 1,
    "difficulty": "easy",
    "hint": "Two halves make a whole"
  },
  {
    "mode": "fractions",
    "grade": "middle",
    "equation": "3/4 + 1/4",
    "answer": 1,
    "difficulty": "easy",
    "hint": "Same denominator, just add tops"
  },
  {
    "mode": "fractions",
    "grade": "middle",
    "equation": "2/3 + 1/3",
    "answer": 1,
    "difficulty": "easy",
    "hint": "Add the numerators"
  },
  {
    "mode": "fractions",
    "grade": "middle",
    "equation": "5/5 + 10/5",
    "answer": 3,
    "difficulty": "medium",
    "hint": "Simplify: 15/5"
  },
  {
    "mode": "fractions",
    "grade": "middle",
    "equation": "8/4 + 12/4",
    "answer": 5,
    "difficulty": "medium",
    "hint": "Add and simplify: 20/4"
  },
  {
    "mode": "fractions",
    "grade": "middle",
    "equation": "18/6 + 24/6",
    "answer": 7,
    "difficulty": "hard",
    "hint": "Simplify: 42/6"
  },
  {
    "mode": "fractions",
    "grade": "middle",
    "equation": "3/8 + 5/8",
    "answer": 1,
    "difficulty": "medium",
    "hint": "Same denominator: 8/8"
  },
  {
    "mode": "fractions",
    "grade": "middle",
    "equation": "7/9 + 2/9",
    "answer": 1,
    "difficulty": "medium",
    "hint": "Add: 9/9"
  },
  {
    "mode": "fractions",
    "grade": "middle",
    "equation": "16/8 - 6/8",
    "answer": 1,
    "difficulty": "hard",
    "hint": "Subtract: 10/8, then simplify"
  },
  {
    "mode": "algebra",
    "grade": "middle",
    "equation": "x + 5 = 12",
    "answer": 7,
    "difficulty": "easy",
    "hint": "Subtract 5 from both sides"
  },
  {
    "mode": "algebra",
    "grade": "middle",
    "equation": "3x = 18",
    "answer": 6,
    "difficulty": "easy",
    "hint": "Divide both sides by 3"
  },
  {
    "mode": "algebra",
    "grade": "middle",
    "equation": "2x + 4 = 14",
    "answer": 5,
    "difficulty": "medium",
    "hint": "Subtract 4, then divide by 2"
  },
  {
    "mode": "algebra",
    "grade": "middle",
    "equation": "5x - 10 = 15",
    "answer": 5,
    "difficulty": "hard",
    "hint": "Add 10, then divide by 5"
  },
  {
    "mode": "algebra",
    "grade": "middle",
    "equation": "x - 8 = 9",
    "answer": 17,
    "difficulty": "easy",
    "hint": "Add 8 to both sides"
  },
  {
    "mode": "algebra",
    "grade": "middle",
    "equation": "4x + 3 = 19",
    "answer": 4,
    "difficulty": "medium",
    "hint": "Subtract 3, then divide by 4"
  },
  {
    "mode": "algebra",
    "grade": "middle",
    "equation": "7x - 14 = 21",
    "answer": 5,
    "difficulty": "hard",
    "hint": "Add 14, then divide by 7"
  },
  {
    "mode": "addition",
    "grade": "high",
    "equation": "347 + 589",
    "answer": 936,
    "difficulty": "easy",
    "hint": "Break into hundreds, tens, ones"
  },
  {
    "mode": "addition",
    "grade": "high",
    "equation": "567 + 789",
    "answer": 1356,
    "difficulty": "medium",
    "hint": "Think: 567 + 800 - 11"
  },
  {
    "mode": "addition",
    "grade": "high",
    "equation": "1234 + 5678",
    "answer": 6912,
    "difficulty": "hard",
    "hint": "Break into place values"
  },
  {
    "mode": "addition",
    "grade": "high",
    "equation": "456 + 1234",
    "answer": 1690,
    "difficulty": "medium",
    "hint": "Think: 456 + 1200 + 34"
  },
  {
    "mode": "subtraction",
    "grade": "high",
    "equation": "1000 - 437",
    "answer": 563,
    "difficulty": "medium",
    "hint": "Think: how much to add to 437 to get 1000?"
  },
  {
    "mode": "subtraction",
    "grade": "high",
    "equation": "2000 - 678",
    "answer": 1322,
    "difficulty": "hard",
    "hint": "Think: 2000 - 700 + 22"
  },
  {
    "mode": "subtraction",
    "grade": "high",
    "equation": "1500 - 789",
    "answer": 711,
    "difficulty": "hard",
    "hint": "Think: 1500 - 800 + 11"
  },
  {
    "mode": "subtraction",
    "grade": "high",
    "equation": "3000 - 1234",
    "answer": 1766,
    "difficulty": "hard",
    "hint": "Think place values"
  },
  {
    "mode": "multiplication",
    "grade": "high",
    "equation": "35 × 14",
    "answer": 490,
    "difficulty": "medium",
    "hint": "Think: 35 × 10 + 35 × 4"
  },
  {
    "mode": "multiplication",
    "grade": "high",
    "equation": "48 × 25",
    "answer": 1200,
    "difficulty": "hard",
    "hint": "Think: 48 × 100 ÷ 4"
  },
  {
    "mode": "multiplication",
    "grade": "high",
    "equation": "56 × 18",
    "answer": 1008,
    "difficulty": "hard",
    "hint": "Think: 56 × 20 - 56 × 2"
  },
  {
    "mode": "multiplication",
    "grade": "high",
    "equation": "42 × 32",
    "answer": 1344,
    "difficulty": "hard",
    "hint": "Think: 42 × 30 + 42 × 2"
  },
  {
    "mode": "multiplication",
    "grade": "high",
    "equation": "29 × 23",
    "answer": 667,
    "difficulty": "hard",
    "hint": "Think: 30 × 23 - 23"
  },
  {
    "mode": "division",
    "grade": "high",
    "equation": "360 ÷ 15",
    "answer": 24,
    "difficulty": "medium",
    "hint": "Think: 15 × 20 = 300, then adjust"
  },
  {
    "mode": "division",
    "grade": "high",
    "equation": "624 ÷ 24",
    "answer": 26,
    "difficulty": "hard",
    "hint": "Think: 24 × 25 = 600"
  },
  {
    "mode": "division",
    "grade": "high",
    "equation": "456 ÷ 12",
    "answer": 38,
    "difficulty": "hard",
    "hint": "Think: 12 × 38"
  },
  {
    "mode": "division",
    "grade": "high",
    "equation": "728 ÷ 26",
    "answer": 28,
    "difficulty": "hard",
    "hint": "Think: 26 × 28"
  },
  {
    "mode": "division",
    "grade": "high",
    "equation": "540 ÷ 18",
    "answer": 30,
    "difficulty": "medium",
    "hint": "Think: 18 × 30"
  },
  {
    "mode": "fractions",
    "grade": "high",
    "equation": "15/3 + 20/5",
    "answer": 9,
    "difficulty": "medium",
    "hint": "Simplify each: 5 + 4"
  },
  {
    "mode": "fractions",
    "grade": "high",
    "equation": "32/4 - 18/6",
    "answer": 5,
    "difficulty": "hard",
    "hint": "Simplify: 8 - 3"
  },
  {
    "mode": "fractions",
    "grade": "high",
    "equation": "24/8 + 35/7",
    "answer": 8,
    "difficulty": "hard",
    "hint": "Simplify: 3 + 5"
  },
  {
    "mode": "fractions",
    "grade": "high",
    "equation": "42/6 - 16/8",
    "answer": 5,
    "difficulty": "hard",
    "hint": "Simplify: 7 - 2"
  },
  {
    "mode": "fractions",
    "grade": "high",
    "equation": "50/5 + 36/9",
    "answer": 14,
    "difficulty": "medium",
    "hint": "Simplify: 10 + 4"
  },
  {
    "mode": "algebra",
    "grade": "high",
    "equation": "4x - 7 = 21",
    "answer": 7,
    "difficulty": "medium",
    "hint": "Add 7, then divide by 4"
  },
  {
    "mode": "algebra",
    "grade": "high",
    "equation": "6x + 12 = 54",
    "answer": 7,
    "difficulty": "medium",
    "hint": "Subtract 12, then divide by 6"
  },
  {
    "mode": "algebra",
    "grade": "high",
    "equation": "3x - 15 = 2x + 10",
    "answer": 25,
    "difficulty": "hard",
    "hint": "Subtract 2x from both sides, then add 15"
  },
  {
    "mode": "algebra",
    "grade": "high",
    "equation": "5x + 8 = 3x + 28",
    "answer": 10,
    "difficulty": "hard",
    "hint": "Subtract 3x and 8 from both sides"
  },
  {
    "mode": "algebra",
    "grade": "high",
    "equation": "2x + 5 = x + 15",
    "answer": 10,
    "difficulty": "hard",
    "hint": "Subtract x and 5 from both sides"
  },
  {
    "mode": "algebra",
    "grade": "high",
    "equation": "8x - 10 = 4x + 14",
    "answer": 6,
    "difficulty": "hard",
    "hint": "Subtract 4x and add 10 to both sides"
  },
  {
    "mode": "algebra",
    "grade": "high",
    "equation": "7x + 6 = 5x + 20",
    "answer": 7,
    "difficulty": "hard",
    "hint": "Subtract 5x and 6 from both sides"
  },
  {
    "mode": "algebra",
    "grade": "high",
    "equation": "9x - 5 = 6x + 16",
    "answer": 7,
    "difficulty": "hard",
    "hint": "Subtract 6x and add 5 to both sides"
  }
];
