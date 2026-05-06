self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
  scheduleAll();
});

const messages = {
  morning: [
    { title: "☀️ 좋은 아침!", body: "오늘도 시작이야~ 약 먹는 거 잊지 말자!" },
    { title: "💊 모닝 알림!", body: "좋은 아침! 오늘 약 꼭 챙겨먹기로 했잖아~" }
  ],
  wash: [
    { title: "🚿 세수하러 가자!", body: "깨끗하게 세수하면 기분 좋을 걸?" },
    { title: "💦 세수 타임~", body: "뽀득뽀득 세수하고 상쾌한 아침 만들어봐!" }
  ],
  cheer: [
    { title: "💙 오늘도 화이팅!", body: "넌 할 수 있어, 오늘 하루도 잘 부탁해!" },
    { title: "🌟 응원할게!", body: "오늘 하루도 최선을 다해봐, 같이 있을게~" }
  ],
  planner: [
    { title: "📓 플래너 썼어?", body: "오늘 할 일 적어뒀어? 잠깐 확인해봐~" },
    { title: "✏️ 플래너 타임!", body: "오늘 계획 정리하면 하루가 훨씬 편해져!" }
  ],
  cleansing: [
    { title: "🧴 클렌징 할 시간!", body: "피부 위해서 클렌징 꼭 하자~!" },
    { title: "🌙 마무리 케어!", body: "클렌징하고 오늘 하루 깔끔하게 마무리하자!" }
  ]
};

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function scheduleAll() {
  const now = new Date();
  const times = [
    { key: 'morning',   h: 21, m: 32 },
    { key: 'wash',      h: 5,  m: 50 },
    { key: 'cheer',     h: 6,  m: 30 },
    { key: 'planner',   h: 8,  m: 0  },
    { key: 'cleansing', h: 22, m: 40 }
  ];

  times.forEach(({ key, h, m }) => {
    const target = new Date();
    target.setHours(h, m, 0, 0);
    if (target <= now) target.setDate(target.getDate() + 1);
    const delay = target - now;

    setTimeout(() => {
      const msg = getRandom(messages[key]);
      self.registration.showNotification(msg.title, {
        body: msg.body,
        icon: '/Ghost_app/icon.png'
      });
      scheduleAll();
    }, delay);
  });
}
