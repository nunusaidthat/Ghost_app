self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));

const messages = {
  morning: [
    { title: "☀️ 좋은 아침!", body: "오늘도 시작이야~ 약 먹는 거 잊지 말자!" },
    { title: "🌅 기상 시간!", body: "일어났어? 약 먼저 챙기고 하루 시작하자 💊" },
    { title: "☀️ 좋은 아침~", body: "오늘 하루도 잘 부탁해! 약 챙겼지?" },
    { title: "🌤️ 아침이야!", body: "눈 떠봐~ 약 먹고 개운하게 시작하자!" },
    { title: "💊 모닝 알림!", body: "좋은 아침! 오늘 약 꼭 챙겨먹기로 했잖아~" },
    { title: "☀️ 일어날 시간!", body: "새로운 하루가 시작됐어, 약부터 챙기자!" },
    { title: "🌞 굿모닝!", body: "오늘도 건강하게! 약 먹고 힘차게 출발~" },
    { title: "✨ 좋은 아침!", body: "아침이 왔어~ 약 챙기고 오늘도 잘 해보자!" }
  ],
  wash: [
    { title: "🚿 세수하러 가자!", body: "깨끗하게 세수하면 기분 좋을 걸?" },
    { title: "🌊 세수 타임~", body: "얼른 세수하고 개운하게 하루 시작!" },
    { title: "✨ 세수할 시간!", body: "세수하면 진짜 눈이 떠진다구~" },
    { title: "💧 세수하자!", body: "차가운 물로 세수하면 잠 확 깰 거야!" },
    { title: "🚿 일어나서 세수!", body: "세수하고 나면 기분이 완전 달라져~" },
    { title: "✨ 세수 시간이야!", body: "개운하게 세수하고 오늘 하루 시작하자!" },
    { title: "💦 세수하러 가자~", body: "뽀득뽀득 세수하고 상쾌한 아침 만들어봐!" },
    { title: "🌊 세수 알림!", body: "잠깐 화장실 다녀와~ 세수하면 진짜 개운해!" }
  ],
  cheer: [
    { title: "💙 오늘도 화이팅!", body: "넌 할 수 있어, 오늘 하루도 잘 부탁해!" },
    { title: "🌟 응원할게!", body: "오늘 하루도 최선을 다해봐, 같이 있을게~" },
    { title: "💫 좋은 하루 되자!", body: "오늘도 잘 해낼 거 알고 있어 😊" },
    { title: "🌈 오늘도 파이팅!", body: "어제보다 더 나은 오늘이 될 거야!" },
    { title: "⭐ 힘내봐~", body: "오늘 하루도 네 편이야, 같이 잘 해보자!" },
    { title: "💪 오늘도 화이팅!", body: "할 수 있어! 오늘 하루도 믿고 있을게~" },
    { title: "🌟 좋은 하루 시작!", body: "오늘도 최선을 다하면 충분해, 화이팅!" },
    { title: "✨ 오늘 하루도~", body: "잘 될 거야! 오늘도 응원하고 있어 💙" },
    { title: "🎯 오늘도 파이팅!", body: "천천히 해도 괜찮아, 그냥 해보는 거야~" },
    { title: "💫 화이팅이야!", body: "오늘 하루도 네가 최고야, 믿어!" }
  ],
  planner: [
    { title: "📓 플래너 썼어?", body: "오늘 할 일 적어뒀어? 잠깐 확인해봐~" },
    { title: "✏️ 플래너 타임!", body: "오늘 계획 정리하면 하루가 훨씬 편해져!" },
    { title: "📝 플래너 확인!", body: "오늘 뭐 할지 적어놨어? 한번 펴봐~" },
    { title: "📒 플래너 쓰자!", body: "계획 세우면 오늘 하루 훨씬 수월해질 거야!" },
    { title: "✏️ 오늘 계획은?", body: "플래너 잠깐 펴봐~ 오늘 할 일 정리해두자!" },
    { title: "📓 기록할 시간!", body: "오늘 하루 계획 적어두면 까먹을 걱정 없어~" },
    { title: "📝 플래너 타임~", body: "잠깐 시간 내서 오늘 할 일 정리해봐!" },
    { title: "✏️ 플래너 확인해봐!", body: "오늘 계획 있어? 없으면 지금 바로 써봐~" }
  ],
  cleansing: [
    { title: "🧴 클렌징 할 시간!", body: "피부 위해서 클렌징 꼭 하자~!" },
    { title: "✨ 피부 챙기자!", body: "오늘 하루 수고했어, 클렌징하고 마무리~" },
    { title: "🌙 클렌징 타임!", body: "자기 전에 클렌징 잊지 말자, 피부가 고마워할 거야!" },
    { title: "💆 클렌징하자~", body: "하루 마무리는 클렌징이지! 피부 챙겨줘~" },
    { title: "🧴 피부 케어 타임!", body: "오늘도 수고했어~ 클렌징하고 푹 쉬어!" },
    { title: "✨ 클렌징 알림!", body: "자기 전 클렌징 꼭! 내일 피부가 달라질 거야~" },
    { title: "🌙 마무리 케어!", body: "클렌징하고 오늘 하루 깔끔하게 마무리하자!" },
    { title: "💤 자기 전 클렌징!", body: "피부 위해서 클렌징 잊지 말기~ 오늘도 수고했어!" }
  ]
};

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

self.addEventListener('message', e => {
  if (e.data?.type === 'SCHEDULE_NOTIFICATIONS') {
    scheduleAll();
  }
});

function scheduleAll() {
  const now = new Date();
  const times = [
    { key: 'morning',   h: 21,  m: 23 },
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
        icon: '/Ghost_app/icon.png',
        badge: '/Ghost_app/icon.png'
      });
      scheduleAll();
    }, delay);
  });
}

scheduleAll();
