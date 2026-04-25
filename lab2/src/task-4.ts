export {};

// abstract - не можна створити напряму, лише успадковувати
abstract class BaseNotifier {
  constructor(protected readonly name: string) {}

  // Нащадки зобов'язані реалізувати цей метод
  abstract send(to: string, subject: string, body: string): void;

  // Шаблонний метод - спільна обгортка для всіх нащадків
  notify(to: string, subject: string, body: string): void {
    console.log(`[${this.name}] Надсилання сповіщення...`);
    this.send(to, subject, body); // викличе send() конкретного нащадка (поліморфізм)
    console.log(`[${this.name}] Сповіщення надіслано`);
  }
}

class EmailNotifier extends BaseNotifier {
  constructor(private readonly smtpServer: string) {
    super("Email");
  }

  // Перші 50 символів body - щоб не виводити весь текст
  override send(to: string, subject: string, body: string): void {
    console.log(`📧 Email → ${to}: "${subject}" | Тіло: ${body.substring(0, 50)} через ${this.smtpServer}`);
  }
}

class SmsNotifier extends BaseNotifier {
  // phonePrefix має значення за замовчуванням "+380"
  constructor(private readonly phonePrefix: string = "+380") {
    super("SMS");
  }

  // SMS обмежений 160 символами
  override send(to: string, subject: string, body: string): void {
    console.log(`📱 SMS → ${this.phonePrefix}${to}: "${body.substring(0, 160)}"`);
  }
}

// Надсилає сповіщення через усі канали зі списку
function sendBulkNotification(notifiers: BaseNotifier[], to: string, subject: string, body: string): void {
  notifiers.forEach(notifier => notifier.notify(to, subject, body));
}

console.log("=== Завдання 4: Наслідування та поліморфізм ===");

const notifiers: BaseNotifier[] = [
  new EmailNotifier("smtp.gmail.com"),
  new SmsNotifier(),
];

sendBulkNotification(
  notifiers,
  "user@example.com",
  "Нова задача призначена",
  "Вам призначено задачу 'Розробити API' з пріоритетом high. Дедлайн: 01.02.2025",
);