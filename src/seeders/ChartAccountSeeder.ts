import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { ChartAccountEntity } from '@/modules/chart-accounts/entities/chart-account.entity';
import { ChartAccountTranslationEntity } from '@/modules/chart-accounts/entities/chart-account-translation.entity';

export class ChartAccountSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    await this.saveChartAccountsTree(em, ChartAccounts);
  }

  async saveChartAccountsTree(
    em: EntityManager,
    items: typeof ChartAccounts,
    parent?: ChartAccountEntity,
  ) {
    for (const item of items) {
      const account = new ChartAccountEntity();
      account.code = item.code;

      if (parent) {
        account.parent = parent;
      }

      for (const [locale, name] of Object.entries(item.translations)) {
        const translation = new ChartAccountTranslationEntity();
        translation.lang = locale;
        translation.name = name;
        translation.chartAccount = account;

        account.translations.add(translation);
      }

      em.persist(account); // відкладене збереження

      // рекурсивно зберігаємо дітей
      if (item.children && item.children.length > 0) {
        await this.saveChartAccountsTree(em, item.children, account);
      }
    }
  }
}

export const ChartAccounts = [
  {
    code: '1000',
    translations: {
      uk: 'Активи',
      en: 'Assets',
      ru: 'Активы',
      ar: 'الأصول',
    },
    children: [
      {
        code: '1100',
        translations: {
          uk: 'Поточні активи',
          en: 'Current Assets',
          ru: 'Оборотные активы',
          ar: 'الأصول المتداولة',
        },
        children: [
          {
            code: '1110',
            translations: {
              uk: 'Грошові кошти в касі',
              en: 'Cash on Hand',
              ru: 'Денежные средства в кассе',
              ar: 'النقد في الصندوق',
            },
            children: [],
          },
          {
            code: '1120',
            translations: {
              uk: 'Грошові кошти на поточних рахунках',
              en: 'Cash in Bank Accounts',
              ru: 'Денежные средства на расчетных счетах',
              ar: 'النقد في الحسابات الجارية',
            },
            children: [],
          },
          {
            code: '1130',
            translations: {
              uk: 'Короткострокові інвестиції',
              en: 'Short-term Investments',
              ru: 'Краткосрочные инвестиции',
              ar: 'الاستثمارات قصيرة الأجل',
            },
            children: [],
          },
          {
            code: '1140',
            translations: {
              uk: 'Дебіторська заборгованість (покупці)',
              en: 'Accounts Receivable (Customers)',
              ru: 'Дебиторская задолженность (покупатели)',
              ar: 'الذمم المدينة (العملاء)',
            },
            children: [
              {
                code: '1141',
                translations: {
                  uk: 'Резерв сумнівних боргів (контр-рахунок)',
                  en: 'Allowance for Doubtful Accounts (Contra-Account)',
                  ru: 'Резерв по сомнительным долгам (контр-счет)',
                  ar: 'مخصص الديون المشكوك في تحصيلها (حساب مقابل)',
                },
                children: [],
              },
            ],
          },
          {
            code: '1150',
            translations: {
              uk: 'Товарно-матеріальні запаси',
              en: 'Inventories',
              ru: 'Товарно-материальные запасы',
              ar: 'المخزون السلعي',
            },
            children: [
              {
                code: '1151',
                translations: {
                  uk: 'Товари на складі А',
                  en: 'Goods in Warehouse A',
                  ru: 'Товары на складе А',
                  ar: 'بضاعة في المستودع أ',
                },
                children: [],
              },
              {
                code: '1152',
                translations: {
                  uk: 'Товари на складі Б',
                  en: 'Goods in Warehouse B',
                  ru: 'Товары на складе Б',
                  ar: 'بضاعة في المستودع ب',
                },
                children: [],
              },
              {
                code: '1153',
                translations: {
                  uk: 'Матеріали та сировина',
                  en: 'Materials and Raw Materials',
                  ru: 'Материалы и сырье',
                  ar: 'المواد الخام',
                },
                children: [],
              },
              {
                code: '1154',
                translations: {
                  uk: 'Товари в дорозі',
                  en: 'Goods in Transit',
                  ru: 'Товары в пути',
                  ar: 'بضاعة في الطريق',
                },
                children: [],
              },
            ],
          },
          {
            code: '1160',
            translations: {
              uk: 'Податок на додану вартість (ПДВ) відшкодований',
              en: 'Value Added Tax (VAT) Reimbursed',
              ru: 'Налог на добавленную стоимость (НДС) возмещенный',
              ar: 'ضريبة القيمة المضافة المستردة',
            },
            children: [],
          },
          {
            code: '1170',
            translations: {
              uk: 'Витрати майбутніх періодів (передоплати)',
              en: 'Prepaid Expenses (Advances)',
              ru: 'Расходы будущих периодов (предоплаты)',
              ar: 'المصروفات المدفوعة مقدما (الدفعات المقدمة)',
            },
            children: [],
          },
        ],
      },
      {
        code: '1200',
        translations: {
          uk: 'Необоротні активи',
          en: 'Non-current Assets',
          ru: 'Внеоборотные активы',
          ar: 'الأصول غير المتداولة',
        },
        children: [
          {
            code: '1210',
            translations: {
              uk: 'Основні засоби',
              en: 'Fixed Assets',
              ru: 'Основные средства',
              ar: 'الممتلكات والمنشآت والمعدات',
            },
            children: [
              {
                code: '1211',
                translations: {
                  uk: 'Земельні ділянки',
                  en: 'Land',
                  ru: 'Земельные участки',
                  ar: 'الأراضي',
                },
                children: [],
              },
              {
                code: '1212',
                translations: {
                  uk: 'Будівлі та споруди',
                  en: 'Buildings and Structures',
                  ru: 'Здания и сооружения',
                  ar: 'المباني والمنشآت',
                },
                children: [],
              },
              {
                code: '1213',
                translations: {
                  uk: 'Машини та обладнання',
                  en: 'Machinery and Equipment',
                  ru: 'Машины и оборудование',
                  ar: 'الآلات والمعدات',
                },
                children: [],
              },
              {
                code: '1214',
                translations: {
                  uk: "Комп'ютерна техніка",
                  en: 'Computer Equipment',
                  ru: 'Компьютерная техника',
                  ar: 'معدات الحاسوب',
                },
                children: [],
              },
              {
                code: '1215',
                translations: {
                  uk: 'Транспортні засоби',
                  en: 'Vehicles',
                  ru: 'Транспортные средства',
                  ar: 'وسائل النقل',
                },
                children: [],
              },
            ],
          },
          {
            code: '1290',
            translations: {
              uk: 'Знос основних засобів (контр-рахунок)',
              en: 'Accumulated Depreciation of Fixed Assets (Contra-Account)',
              ru: 'Износ основных средств (контр-счет)',
              ar: 'مجمع إهلاك الأصول الثابتة (حساب مقابل)',
            },
            children: [],
          },
          {
            code: '1300',
            translations: {
              uk: 'Нематеріальні активи',
              en: 'Intangible Assets',
              ru: 'Нематериальные активы',
              ar: 'الأصول غير الملموسة',
            },
            children: [
              {
                code: '1310',
                translations: {
                  uk: 'Програмне забезпечення',
                  en: 'Software',
                  ru: 'Программное обеспечение',
                  ar: 'البرمجيات',
                },
                children: [],
              },
              {
                code: '1320',
                translations: {
                  uk: 'Торгові марки',
                  en: 'Trademarks',
                  ru: 'Торговые марки',
                  ar: 'العلامات التجارية',
                },
                children: [],
              },
            ],
          },
          {
            code: '1390',
            translations: {
              uk: 'Амортизація нематеріальних активів (контр-рахунок)',
              en: 'Accumulated Amortization of Intangible Assets (Contra-Account)',
              ru: 'Амортизация нематериальных активов (контр-счет)',
              ar: 'مجمع إطفاء الأصول غير الملموسة (حساب مقابل)',
            },
            children: [],
          },
        ],
      },
    ],
  },
  {
    code: '2000',
    translations: {
      uk: 'Пасиви',
      en: 'Liabilities',
      ru: 'Пассивы',
      ar: 'الخصوم',
    },
    children: [
      {
        code: '2100',
        translations: {
          uk: "Короткострокові зобов'язання",
          en: 'Current Liabilities',
          ru: 'Краткосрочные обязательства',
          ar: 'الخصوم المتداولة',
        },
        children: [
          {
            code: '2110',
            translations: {
              uk: 'Кредиторська заборгованість (постачальники)',
              en: 'Accounts Payable (Suppliers)',
              ru: 'Кредиторская задолженность (поставщики)',
              ar: 'الذمم الدائنة (الموردون)',
            },
            children: [],
          },
          {
            code: '2120',
            translations: {
              uk: 'Заборгованість по заробітній платі',
              en: 'Salaries Payable',
              ru: 'Задолженность по заработной плате',
              ar: 'الرواتب المستحقة الدفع',
            },
            children: [],
          },
          {
            code: '2130',
            translations: {
              uk: 'Заборгованість по податках і зборах',
              en: 'Taxes and Fees Payable',
              ru: 'Задолженность по налогам и сборам',
              ar: 'الضرائب والرسوم المستحقة الدفع',
            },
            children: [
              {
                code: '2131',
                translations: {
                  uk: 'Податок на додану вартість (ПДВ) до сплати',
                  en: 'Value Added Tax (VAT) Payable',
                  ru: 'Налог на добавленную стоимость (НДС) к уплате',
                  ar: 'ضريبة القيمة المضافة المستحقة الدفع',
                },
                children: [],
              },
              {
                code: '2132',
                translations: {
                  uk: 'Податок на прибуток',
                  en: 'Income Tax Payable',
                  ru: 'Налог на прибыль',
                  ar: 'ضريبة الدخل المستحقة الدفع',
                },
                children: [],
              },
            ],
          },
          {
            code: '2140',
            translations: {
              uk: 'Короткострокові банківські кредити',
              en: 'Short-term Bank Loans',
              ru: 'Краткосрочные банковские кредиты',
              ar: 'القروض البنكية قصيرة الأجل',
            },
            children: [],
          },
          {
            code: '2150',
            translations: {
              uk: 'Доходи майбутніх періодів',
              en: 'Deferred Revenue',
              ru: 'Доходы будущих периодов',
              ar: 'إيرادات مؤجلة',
            },
            children: [],
          },
        ],
      },
      {
        code: '2200',
        translations: {
          uk: "Довгострокові зобов'язання",
          en: 'Long-term Liabilities',
          ru: 'Долгосрочные обязательства',
          ar: 'الخصوم طويلة الأجل',
        },
        children: [
          {
            code: '2210',
            translations: {
              uk: 'Довгострокові банківські кредити',
              en: 'Long-term Bank Loans',
              ru: 'Долгосрочные банковские кредиты',
              ar: 'القروض البنكية طويلة الأجل',
            },
            children: [],
          },
          {
            code: '2220',
            translations: {
              uk: 'Довгострокова заборгованість',
              en: 'Long-term Debt',
              ru: 'Долгосрочная задолженность',
              ar: 'الديون طويلة الأجل',
            },
            children: [],
          },
        ],
      },
    ],
  },
  {
    code: '3000',
    translations: {
      uk: 'Власний капітал',
      en: 'Equity',
      ru: 'Собственный капитал',
      ar: 'حقوق الملكية',
    },
    children: [
      {
        code: '3100',
        translations: {
          uk: 'Зареєстрований (статутний) капітал',
          en: 'Registered (Share) Capital',
          ru: 'Зарегистрированный (уставный) капитал',
          ar: 'رأس المال المسجل (الأسهم)',
        },
        children: [],
      },
      {
        code: '3200',
        translations: {
          uk: 'Додатковий капітал',
          en: 'Additional Paid-in Capital',
          ru: 'Дополнительный капитал',
          ar: 'رأس المال الإضافي',
        },
        children: [],
      },
      {
        code: '3300',
        translations: {
          uk: 'Резервний капітал',
          en: 'Reserve Capital',
          ru: 'Резервный капитал',
          ar: 'رأس المال الاحتياطي',
        },
        children: [],
      },
      {
        code: '3400',
        translations: {
          uk: 'Нерозподілений прибуток (непокритий збиток)',
          en: 'Retained Earnings (Accumulated Deficit)',
          ru: 'Нераспределенная прибыль (непокрытый убыток)',
          ar: 'الأرباح المحتجزة (الخسائر المتراكمة)',
        },
        children: [],
      },
    ],
  },
  {
    code: '4000',
    translations: {
      uk: 'Доходи',
      en: 'Revenue',
      ru: 'Доходы',
      ar: 'الإيرادات',
    },
    children: [
      {
        code: '4100',
        translations: {
          uk: 'Дохід від реалізації товарів',
          en: 'Revenue from Goods Sales',
          ru: 'Доход от реализации товаров',
          ar: 'إيرادات مبيعات البضائع',
        },
        children: [],
      },
      {
        code: '4110',
        translations: {
          uk: 'Повернення товарів та знижки',
          en: 'Sales Returns and Discounts',
          ru: 'Возврат товаров и скидки',
          ar: 'مرتجعات المبيعات والخصومات',
        },
        children: [],
      },
      {
        code: '4200',
        translations: {
          uk: 'Дохід від надання послуг',
          en: 'Revenue from Services Rendered',
          ru: 'Доход от оказания услуг',
          ar: 'إيرادات الخدمات المقدمة',
        },
        children: [],
      },
      {
        code: '4300',
        translations: {
          uk: 'Інші операційні доходи',
          en: 'Other Operating Income',
          ru: 'Прочие операционные доходы',
          ar: 'إيرادات تشغيلية أخرى',
        },
        children: [],
      },
      {
        code: '4400',
        translations: {
          uk: 'Фінансові доходи (відсотки, дивіденди)',
          en: 'Financial Income (Interest, Dividends)',
          ru: 'Финансовые доходы (проценты, дивиденды)',
          ar: 'إيرادات مالية (فوائد، أرباح أسهم)',
        },
        children: [],
      },
      {
        code: '4500',
        translations: {
          uk: 'Інші доходи',
          en: 'Other Income',
          ru: 'Прочие доходы',
          ar: 'إيرادات أخرى',
        },
        children: [],
      },
    ],
  },
  {
    code: '5000',
    translations: {
      uk: 'Витрати',
      en: 'Expenses',
      ru: 'Расходы',
      ar: 'المصروفات',
    },
    children: [
      {
        code: '5100',
        translations: {
          uk: 'Собівартість реалізованих товарів',
          en: 'Cost of Goods Sold',
          ru: 'Себестоимость реализованных товаров',
          ar: 'تكلفة البضاعة المباعة',
        },
        children: [],
      },
      {
        code: '5200',
        translations: {
          uk: 'Адміністративні витрати',
          en: 'Administrative Expenses',
          ru: 'Административные расходы',
          ar: 'مصروفات إدارية',
        },
        children: [
          {
            code: '5210',
            translations: {
              uk: 'Витрати на утримання апарату управління',
              en: 'Management Staff Maintenance Expenses',
              ru: 'Расходы на содержание аппарата управления',
              ar: 'مصروفات صيانة الجهاز الإداري',
            },
            children: [],
          },
          {
            code: '5220',
            translations: {
              uk: 'Оренда адміністративних приміщень',
              en: 'Rent of Administrative Premises',
              ru: 'Аренда административных помещений',
              ar: 'إيجار المباني الإدارية',
            },
            children: [],
          },
          {
            code: '5230',
            translations: {
              uk: 'Комунальні послуги (адмін.)',
              en: 'Utilities (Admin.)',
              ru: 'Коммунальные услуги (админ.)',
              ar: 'خدمات المرافق (إداري)',
            },
            children: [],
          },
          {
            code: '5240',
            translations: {
              uk: "Послуги зв'язку",
              en: 'Communication Services',
              ru: 'Услуги связи',
              ar: 'خدمات الاتصالات',
            },
            children: [],
          },
          {
            code: '5250',
            translations: {
              uk: 'Банківські та юридичні послуги',
              en: 'Banking and Legal Services',
              ru: 'Банковские и юридические услуги',
              ar: 'خدمات مصرفية وقانونية',
            },
            children: [],
          },
          {
            code: '5260',
            translations: {
              uk: 'Амортизація основних засобів (адмін.)',
              en: 'Depreciation of Fixed Assets (Admin.)',
              ru: 'Амортизация основных средств (админ.)',
              ar: 'إهلاك الأصول الثابتة (إداري)',
            },
            children: [],
          },
        ],
      },
      {
        code: '5300',
        translations: {
          uk: 'Витрати на збут',
          en: 'Selling Expenses',
          ru: 'Расходы на сбыт',
          ar: 'مصروفات البيع',
        },
        children: [
          {
            code: '5310',
            translations: {
              uk: 'Витрати на оплату праці продавців',
              en: 'Sales Staff Payroll Expenses',
              ru: 'Расходы на оплату труда продавцов',
              ar: 'مصروفات أجور موظفي المبيعات',
            },
            children: [],
          },
          {
            code: '5320',
            translations: {
              uk: 'Рекламні та маркетингові послуги',
              en: 'Advertising and Marketing Services',
              ru: 'Рекламные и маркетинговые услуги',
              ar: 'خدمات الدعاية والتسويق',
            },
            children: [],
          },
          {
            code: '5330',
            translations: {
              uk: 'Транспортні витрати (доставка покупцям)',
              en: 'Transportation Expenses (Delivery to Customers)',
              ru: 'Транспортные расходы (доставка покупателям)',
              ar: 'مصروفات النقل (التسليم للعملاء)',
            },
            children: [],
          },
          {
            code: '5340',
            translations: {
              uk: 'Комісійні винагороди',
              en: 'Commission Fees',
              ru: 'Комиссионные вознаграждения',
              ar: 'رسوم العمولة',
            },
            children: [],
          },
        ],
      },
      {
        code: '5400',
        translations: {
          uk: 'Інші операційні витрати',
          en: 'Other Operating Expenses',
          ru: 'Прочие операционные расходы',
          ar: 'مصروفات تشغيلية أخرى',
        },
        children: [
          {
            code: '5410',
            translations: {
              uk: 'Штрафи та пені',
              en: 'Fines and Penalties',
              ru: 'Штрафы и пени',
              ar: 'غرامات وعقوبات',
            },
            children: [],
          },
          {
            code: '5420',
            translations: {
              uk: 'Втрати від списання дебіторської заборгованості',
              en: 'Losses from Write-off of Accounts Receivable',
              ru: 'Потери от списания дебиторской задолженности',
              ar: 'خسائر شطب الذمم المدينة',
            },
            children: [],
          },
        ],
      },
      {
        code: '5500',
        translations: {
          uk: 'Фінансові витрати (відсотки за кредитами)',
          en: 'Financial Expenses (Interest on Loans)',
          ru: 'Финансовые расходы (проценты по кредитам)',
          ar: 'مصروفات مالية (فوائد القروض)',
        },
        children: [],
      },
      {
        code: '5600',
        translations: {
          uk: 'Податок на прибуток',
          en: 'Income Tax Expense',
          ru: 'Налог на прибыль',
          ar: 'مصروف ضريبة الدخل',
        },
        children: [],
      },
    ],
  },
];
