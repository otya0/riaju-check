const $ = (id) => document.getElementById(id);

function scorePlan(v) {
  switch (v) {
    case "date":
      return 50;
    case "friends":
      return 35;
    case "family":
      return 25;
    case "work":
      return 10;
    case "solo":
      return 15;
    case "none":
      return 0;
    default:
      return 0;
  }
}

function scoreWith(v) {
  switch (v) {
    case "partner":
      return 45;
    case "friends":
      return 30;
    case "family":
      return 20;
    case "online":
      return 18;
    case "alone":
      return 0;
    default:
      return 0;
  }
}

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function rank(s) {
  if (s >= 85)
    return {
      label: "超リア充",
      msg: "イルミより眩しい。周囲に配慮しつつ爆発しろ。",
    };
  if (s >= 65)
    return {
      label: "リア充",
      msg: "予定も気分も良い感じ。勝ち組の波に乗ってる。",
    };
  if (s >= 45)
    return {
      label: "準リア充",
      msg: "楽しんでる。リア充は“人数”じゃなく“満足度”だ。",
    };
  if (s >= 25)
    return { label: "ふつう", msg: "平常運転。来年の自分に期待しよう。" };
  return {
    label: "非リア充（自称）",
    msg: "静かな夜も悪くない。自分の機嫌を取れるのは強い。",
  };
}

$("judge").addEventListener("click", () => {
  const plan = $("plan").value;
  const goout = $("goout").value;
  const withwho = $("withwho").value;
  const xmas = $("xmas").value;

  let s = 0;
  s += scorePlan(plan);
  s += scoreWith(withwho);
  s += goout === "yes" ? 10 : 0;
  s += xmas === "yes" ? 15 : 0;

  // 予定と誰が矛盾してるとき少し減点（遊び心）
  if (plan === "date" && withwho !== "partner") s -= 10;
  if (plan === "none" && (withwho === "partner" || withwho === "friends"))
    s += 5;

  s = clamp(s, 0, 100);
  const r = rank(s);

  $("result").innerHTML = `
    <h2>結果：${r.label}</h2>
    <p class="score">リア充度：<strong>${s}</strong> / 100</p>
    <p>${r.msg}</p>
  `;
});
