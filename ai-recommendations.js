// ========== AI-РЕКОМЕНДАЦІЇ ДЛЯ САЙТУ ==========
// Підключається до profile.html, diagnostics.html, chat.html
// Використання: AI_RECOMMENDATIONS.getRecommendations(userData)

const AI_RECOMMENDATIONS = {
  // Отримання рекомендацій на основі даних користувача
  getRecommendations: function(userData) {
    const recs = [];
    const emotions = userData.emotions || [];
    const tests = userData.testResults || {};
    const avgEmotion = emotions.length ? emotions.reduce((a,b)=>a+b.value,0)/emotions.length : 0;
    
    if (avgEmotion < 3) {
      recs.push({ 
        type: "urgent", 
        title: "🆘 Термінова підтримка", 
        text: "Ваш стан потребує уваги. Зверніться до психолога або на кризову лінію 0 800 100 102", 
        link: "crisis.html" 
      });
    }
    
    if (avgEmotion < 5) {
      recs.push({ 
        type: "technique", 
        title: "🌍 Техніка заземлення", 
        text: "Спробуйте техніку 5-4-3-2-1 для повернення в «тут і зараз»", 
        link: "education.html#grounding" 
      });
    }
    
    if (tests.anxiety && tests.anxiety.level === "Висока тривога") {
      recs.push({ 
        type: "technique", 
        title: "🌬️ Дихання 4-7-8", 
        text: "Ця техніка допомагає знизити рівень тривоги за 2-3 хвилини", 
        link: "education.html#breath" 
      });
    }
    
    if (tests.ptsd && tests.ptsd.level === "Високі симптоми ПТСР") {
      recs.push({ 
        type: "therapy", 
        title: "🩹 EMDR-терапія", 
        text: "Рекомендується звернутись до психолога для EMDR-терапії", 
        link: "contacts.html" 
      });
    }
    
    if (emotions.length > 0 && emotions[emotions.length-1]?.value > emotions[0]?.value) {
      recs.push({ 
        type: "positive", 
        title: "📈 Позитивна динаміка", 
        text: "Ваш стан покращується! Продовжуйте в тому ж дусі", 
        link: "training.html" 
      });
    }
    
    if (recs.length === 0) {
      recs.push({ 
        type: "normal", 
        title: "✨ Усе добре", 
        text: "Ваш стан у межах норми. Продовжуйте підтримувати себе!", 
        link: "education.html" 
      });
    }
    
    return recs;
  },
  
  // Підбір техніки за емоцією
  suggestTechnique: function(emotion) {
    const techniques = { 
      "тривога": "Дихання 4-7-8 та заземлення 5-4-3-2-1",
      "тривожно": "Дихання 4-7-8 та заземлення 5-4-3-2-1",
      "сум": "Техніка «Безпечне місце» та ведення щоденника",
      "сумно": "Техніка «Безпечне місце» та ведення щоденника",
      "гнів": "Фізичне навантаження та техніка «Вихід гніву»",
      "злий": "Фізичне навантаження та техніка «Вихід гніву»",
      "страх": "Техніка заземлення та дихання животом",
      "страшно": "Техніка заземлення та дихання животом",
      "паніка": "Дихання 4-7-8 + заземлення 5-4-3-2-1 + холодна вода"
    };
    
    // Пошук за ключовим словом
    for (const [key, value] of Object.entries(techniques)) {
      if (emotion.toLowerCase().includes(key)) {
        return value;
      }
    }
    
    return "Техніка заземлення 5-4-3-2-1 або дихання 4-7-8";
  },
  
  // Аналіз тексту повідомлення (для чату)
  analyzeMessage: function(message) {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('панік') || lowerMsg.includes('страх') || lowerMsg.includes('боюсь')) {
      return { emotion: "паніка", technique: "Дихання 4-7-8 + заземлення", urgency: "high" };
    }
    if (lowerMsg.includes('тривог') || lowerMsg.includes('хвилю') || lowerMsg.includes('пережива')) {
      return { emotion: "тривога", technique: "Дихання 4-7-8", urgency: "medium" };
    }
    if (lowerMsg.includes('сум') || lowerMsg.includes('плач') || lowerMsg.includes('важко')) {
      return { emotion: "сум", technique: "Безпечне місце", urgency: "medium" };
    }
    if (lowerMsg.includes('гнів') || lowerMsg.includes('злий') || lowerMsg.includes('агрес')) {
      return { emotion: "гнів", technique: "Фізичне навантаження", urgency: "medium" };
    }
    if (lowerMsg.includes('втом') || lowerMsg.includes('виснаж')) {
      return { emotion: "втома", technique: "Відпочинок та сканування тіла", urgency: "low" };
    }
    
    return { emotion: "нейтральний", technique: "Техніка заземлення", urgency: "low" };
  }
};

// Для використання в браузері
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AI_RECOMMENDATIONS;
}

// Для перевірки в консолі
console.log('AI_RECOMMENDATIONS завантажено!');
console.log('Приклад: AI_RECOMMENDATIONS.suggestTechnique("мені тривожно")');