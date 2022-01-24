const e = `
Привет!
В приложении реализованы все пункты из требований, кроме двух нижеперечисленных.
UI получился страшненький, но для этого задания он вроде и не требовался особо.

Car animation:
(+5) User clicks to the engine stop button -> UI is waiting for answer for stopping engine -> car returned to it's initial place.
У меня машины не возвращаются в исходное положение, а остаются на месте. Чтобы их вернуть, нужно нажать reset race.

"Winners" view:
(+10) User should be able to sort cars by wins number and by best time (ASC, DESC).
Сортировки нет.

Итого, финальная оценка 175/190

Удачной проверки!`

function evaluation(): void {
  console.log(e);
}

export default evaluation;
