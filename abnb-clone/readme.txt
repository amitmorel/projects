﻿(יש לשנות לRTL)

__איך מריצים את הפרוייקט :__
# דרישת קדם - 
# להתקין nodejs + npm
# להתקין conda 3.7
1) להריץ את run.cmd
2) להריץ את run2.cmd


__הסבר API__
הAPI של השרת מכיל 5 פונקציות :
- GET של כל הDB - משרת גם את החיפוש (הסינון מתבצע בCLIENT)
- GET לפי ID - משרת בCLIENT את דף הפירוט על הבית
- PUT לפי ID - משרת את הBOOKING - הCLIENT מחליף את כל אובייקט הBBOKING
(פיצ'רים נוספים)
- PUT לכל הDB עם אותנטיקציה - לריקון כל הBOOKINGS של הבתים (לשימוש ADMIN)
- PUT לפי ID - לריקון כל הBOOKINGS של בית ספציפי (לשימוש ADMIN)


__הסבר DB__
השרת מאתר לפי ObjectID, (או מביא הכל, בהתאם לבקשה) בDB, ומביא את json עם כל הפרטים.
אין סכמה מהסיבה שאין הוספת בתים, רק הצגה ועדכון של בתים קיימים.

__פרטים נוספים __
1) ביצעתי DEPLOY של העבודה לאתר NOW by Zeit
וכתבתי מדריך בMD של הdeploy (מצורף בPDF) כי חיברתי הסברים ממספר מקורות לביצוע הפעולה הזו. (אין tutorial מסודר)
הכתובת לקליינט (צריך לבחור את הPYTHON בין השרתים בחלון שיקפוץ)
https://amit-abnb-clone-mk45jw0dx.now.sh/
הכתובת לשרת python:
https://abnb-server-python-kq6oyjrse.now.sh/

2) הוספתי error הנדלרים, שמציגים דף HTML, ולא JSON חיוור.
