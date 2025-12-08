import type { CourseManifest } from "./types";
export type { LessonTask, Lesson, ModuleProject, Module, CourseManifest } from './types';

export const manifest: CourseManifest = {
    "modules": [
      {
        "id": "bazovye-komandy",
        "title": "Базовые команды",
        "project": {
          "id": "git-mini-project",
          "title": "Рабочий процесс Git",
          "mdPath": "/lessons/bazovye-komandy/project.md",
          "repoUrl": "https://github.com/n1ckwhite/JavaScript-Universe",
          "authors": [
            { "username": "n1ckwhite", "name": "Nick White" },
            { "username": "demo-author-1", "name": "Author One" },
            { "username": "demo-author-2", "name": "Author Two" },
            { "username": "demo-author-3", "name": "Author Three" },
            { "username": "demo-author-4", "name": "Author Four" },
            { "username": "demo-author-5", "name": "Author Five" },
            { "username": "demo-author-6", "name": "Author Six" },
            { "username": "demo-author-7", "name": "Author Seven" },
            { "username": "demo-author-8", "name": "Author Eight" },
            { "username": "demo-author-9", "name": "Author Nine" },
            { "username": "demo-author-10", "name": "Author Ten" },
            { "username": "demo-author-11", "name": "Author Eleven" },
            { "username": "demo-author-12", "name": "Author Twelve" }
          ],
          "ratingCount": 0,
          "views": 0
        },
        "lessons": [
          {
            "id": "vvedenie-v-git",
            "title": "Введение в Git",
            "mdPath": "/lessons/bazovye-komandy/stage-01-intro-to-git.md",
            "durationMin": 20,
            "rating": 4.9,
            "ratingCount": 37,
            "views": 1280,
            "authors": [
              { "username": "n1ckwhite", "name": "Nick White" }
            ],
            "tasks": [
              {
                id: "quiz-vcs-basics",
                title: "Что такое VCS и зачем она нужна?",
                description: "Короткий квиз: выбери верный вариант",
                type: 'mcq',
                authors: [{ "username": "n1ckwhite", "name": "Nick White" }],
                mcq: {
                  options: [
                    { id: 'a', label: 'VCS — это редактор кода' },
                    { id: 'b', label: 'VCS — система контроля версий: хранит историю изменений' },
                    { id: 'c', label: 'VCS — сервис для деплоя' }
                  ],
                  correctId: 'b'
                }
              },
              {
                id: "lifecycle-order",
                title: "Порядок жизненного цикла изменений",
                description: "Введи цепочку через стрелки",
                type: 'text',
                authors: [{ "username": "n1ckwhite", "name": "Nick White" }],
                text: {
                  placeholder: 'working tree -> staging -> commit -> push',
                  allowed: ['workingtree->staging->commit->push','workingdirectory->staging->commit->push']
                }
              }
            ]
          },
          {
            "id": "osnovnye-komandy-git",
            "title": "Основные команды: add, push, pull, fetch, clone",
            "mdPath": "/lessons/bazovye-komandy/stage-02-git-basic-commands-add-push-pull-fetch-clone.md",
            "authors": [
              { "username": "n1ckwhite", "name": "Nick White" }
            ],
            "tasks": [
              {
                id: "init-repo",
                title: "Инициализируй репозиторий",
                description: "Введи одну команду",
                type: 'terminal',
                authors: [{ "username": "n1ckwhite", "name": "Nick White" }],
                terminal: {
                  placeholder: 'git init',
                  expected: ['git init']
                }
              },
              {
                id: "stage-and-commit",
                title: "Подготовь и закоммить изменения",
                description: "Проверь, что ты знаешь последовательность",
                type: 'terminal',
                authors: [{ "username": "n1ckwhite", "name": "Nick White" }],
                terminal: {
                  placeholder: 'git add . && git commit -m "msg"',
                  includes: ['git add', 'git commit -m', '&&']
                }
              }
            ]
          },
          {
            "id": "razlichiya-mezhdu-git-pull-i-git-fetch",
            "title": "Различия между git pull и git fetch",
            "mdPath": "/lessons/bazovye-komandy/stage-03-git-pull-vs-fetch.md",
            "authors": [
              { "username": "n1ckwhite", "name": "Nick White" }
            ],
            "tasks": [
              {
                id: "pull-vs-fetch-1",
                title: "Что обновляет рабочую директорию?",
                type: 'mcq',
                authors: [{ "username": "n1ckwhite", "name": "Nick White" }],
                mcq: {
                  options: [
                    { id: 'pull', label: 'git pull' },
                    { id: 'fetch', label: 'git fetch' }
                  ],
                  correctId: 'pull'
                }
              },
              {
                id: "pull-vs-fetch-2",
                title: "Что безопасно перед ревью кода?",
                description: "Перед просмотром новых коммитов в origin",
                type: 'mcq',
                authors: [{ "username": "n1ckwhite", "name": "Nick White" }],
                mcq: {
                  options: [
                    { id: 'pull', label: 'git pull' },
                    { id: 'fetch', label: 'git fetch' }
                  ],
                  correctId: 'fetch'
                }
              }
            ]
          },
          {
            "id": "git-pull-i-fetch-pri-nezakommichennyh-izmeneniyah",
            "title": "pull/fetch при незакоммиченных изменениях",
            "mdPath": "/lessons/bazovye-komandy/stage-04-pull-fetch-with-uncommitted-changes.md",
            "authors": [
              { "username": "n1ckwhite", "name": "Nick White" }
            ],
            "tasks": [
              {
                id: "uncommitted-stash",
                title: "Что сделать перед pull при локальных изменениях?",
                type: 'mcq',
                authors: [{ "username": "n1ckwhite", "name": "Nick White" }],
                mcq: {
                  options: [
                    { id: 'a', label: 'git pull, затем решать' },
                    { id: 'b', label: 'git stash, затем git pull' },
                    { id: 'c', label: 'git fetch и ничего больше' }
                  ],
                  correctId: 'b'
                }
              }
            ]
          },
          {
            "id": "vidy-sliyaniya-v-git-i-ih-vliyanie-na-konflikty",
            "title": "Виды слияния и их влияние на конфликты",
            "mdPath": "/lessons/bazovye-komandy/stage-05-merge-types-and-conflicts.md",
            "tasks": [
              {
                id: "merge-types",
                title: "Сопоставь типы слияния",
                type: 'checkbox',
                checkbox: {
                  options: [
                    { id: 'ff', label: 'Fast‑forward — история линейна' },
                    { id: 'mc', label: 'Merge commit — создаётся коммит слияния' },
                    { id: 'wrong', label: 'Fast‑forward — обязательно создаёт merge‑коммит' }
                  ],
                  correctIds: ['ff','mc']
                }
              }
            ]
          },
          {
            "id": "avtomaticheskoe-i-ruchnoe-sliyanie-v-git",
            "title": "Автоматическое и ручное слияние",
            "mdPath": "/lessons/bazovye-komandy/stage-06-automatic-vs-manual-merge.md",
            "tasks": [
              {
                id: "auto-vs-manual",
                title: "Когда потребуется ручное слияние?",
                type: 'mcq',
                mcq: {
                  options: [
                    { id: 'a', label: 'Изменения затрагивают разные файлы' },
                    { id: 'b', label: 'Изменения в одной и той же строке' },
                    { id: 'c', label: 'Добавлены новые файлы без пересечений' }
                  ],
                  correctId: 'b'
                }
              }
            ]
          },
          {
            "id": "konflikty-sliyaniya-v-bolshih-komandah",
            "title": "Конфликты слияния в больших командах",
            "mdPath": "/lessons/bazovye-komandy/stage-07-merge-conflicts-in-large-teams.md",
            "tasks": [
              {
                id: "large-team-practices",
                title: "Что помогает снизить конфликты?",
                type: 'checkbox',
                checkbox: {
                  options: [
                    { id: 'a', label: 'Частые маленькие pull‑request\'ы' },
                    { id: 'b', label: 'Работа всем в одной ветке неделями' },
                    { id: 'c', label: 'Code owners / чёткие области ответственности' },
                    { id: 'd', label: 'Регулярные rebase/merge из main' }
                  ],
                  correctIds: ['a','c','d']
                }
              }
            ]
          },
          {
            "id": "instrumenty-dlya-razresheniya-konfliktov",
            "title": "Инструменты для разрешения конфликтов",
            "mdPath": "/lessons/bazovye-komandy/stage-08-tools-for-resolving-conflicts.md",
            "tasks": [
              {
                id: "tools-mc",
                title: "Выбери инструменты",
                description: "Какие инструменты помогают в решении конфликтов?",
                type: 'checkbox',
                checkbox: {
                  options: [
                    { id: 'a', label: 'git mergetool / kdiff3 / meld' },
                    { id: 'b', label: 'VS Code Merge Editor' },
                    { id: 'c', label: 'git clean -fdx' },
                    { id: 'd', label: 'GitHub/GitLab Resolve conflicts UI' }
                  ],
                  correctIds: ['a','b','d']
                }
              }
            ]
          },
          {
            "id": "vvedenie-v-merge-conflict",
            "title": "Merge conflict: основы",
            "mdPath": "/lessons/bazovye-komandy/stage-09-merge-conflict-basics.md"
          },
          {
            "id": "reshenie-konfliktov-posle-git-pull",
            "title": "Решение конфликтов после git pull",
            "mdPath": "/lessons/bazovye-komandy/stage-10-resolving-conflicts-after-pull.md"
          },
          {
            "id": "git-merge-abort-i-otmena-sliyaniya",
            "title": "git merge --abort и отмена слияния",
            "mdPath": "/lessons/bazovye-komandy/stage-11-merge-abort-and-cancel.md"
          },
          {
            "id": "predotvraschenie-konfliktov-sliyaniya",
            "title": "Предотвращение конфликтов",
            "mdPath": "/lessons/bazovye-komandy/stage-12-preventing-merge-conflicts.md"
          },
          {
            "id": "nerazreshimye-konflikty-sliyaniya-i-chto-delat",
            "title": "Неразрешимые конфликты: что делать",
            "mdPath": "/lessons/bazovye-komandy/stage-13-unresolvable-conflicts-what-to-do.md"
          },
          {
            "id": "git-push-i-konflikty-s-udalennym-repozitoriem",
            "title": "git push и конфликты с удалённым репозиторием",
            "mdPath": "/lessons/bazovye-komandy/stage-14-git-push-and-remote-conflicts.md"
          },
          {
            "id": "chto-delat-esli-git-push-v-nepravilnuyu-vetku",
            "title": "Что делать, если push в неправильную ветку",
            "mdPath": "/lessons/bazovye-komandy/stage-15-push-to-wrong-branch-what-to-do.md"
          }
        ]
      },
      {
        "id": "html-css",
        "title": "HTML CSS",
        "lessons": [
          { "id": "stage-01-what-is-semantic-html", "title": "Что такое семантическая вёрстка?", "mdPath": "/lessons/html-css/stage-01-what-is-semantic-html.md" },
          { "id": "stage-02-semantic-elements-html5", "title": "Семантические элементы HTML5", "mdPath": "/lessons/html-css/stage-02-semantic-elements-html5.md" },
          { "id": "stage-03-how-browsers-and-screenreaders-interpret-semantics", "title": "Как браузеры и скринридеры интерпретируют семантику", "mdPath": "/lessons/html-css/stage-03-how-browsers-and-screenreaders-interpret-semantics.md" },
          { "id": "stage-04-semantics-and-accessibility", "title": "Семантика и доступность", "mdPath": "/lessons/html-css/stage-04-semantics-and-accessibility.md" },
          { "id": "stage-05-semantics-and-seo", "title": "Семантика и SEO", "mdPath": "/lessons/html-css/stage-05-semantics-and-seo.md" },
          { "id": "stage-06-consequences-of-bad-semantics", "title": "Последствия неправильной семантики", "mdPath": "/lessons/html-css/stage-06-consequences-of-bad-semantics.md" },
          { "id": "stage-07-when-to-use-semantics", "title": "Когда использовать семантику", "mdPath": "/lessons/html-css/stage-07-when-to-use-semantics.md" },
          { "id": "stage-08-css-units-overview", "title": "Обзор единиц измерения", "mdPath": "/lessons/html-css/stage-08-css-units-overview.md" },
          { "id": "stage-09-intro-to-css-units", "title": "Введение в работу с единицами в CSS", "mdPath": "/lessons/html-css/stage-09-intro-to-css-units.md" },
          { "id": "stage-10-relative-vs-absolute-units", "title": "Относительные vs абсолютные единицы", "mdPath": "/lessons/html-css/stage-10-relative-vs-absolute-units.md" },
          { "id": "stage-11-em-rem-px-differences", "title": "em, rem и px: различия и применение", "mdPath": "/lessons/html-css/stage-11-em-rem-px-differences.md" },
          { "id": "stage-12-units-for-responsiveness", "title": "Единицы для адаптивности", "mdPath": "/lessons/html-css/stage-12-units-for-responsiveness.md" },
          { "id": "stage-13-vw-vh-how-they-work", "title": "vw и vh: как работают", "mdPath": "/lessons/html-css/stage-13-vw-vh-how-they-work.md" },
          { "id": "stage-14-margin-and-padding", "title": "Отступы: margin и padding", "mdPath": "/lessons/html-css/stage-14-margin-and-padding.md" },
          { "id": "stage-15-positioning-basics", "title": "Позиционирование: основы", "mdPath": "/lessons/html-css/stage-15-positioning-basics.md" },
          { "id": "stage-16-inline-vs-block-positioning", "title": "Строчное vs блочное позиционирование", "mdPath": "/lessons/html-css/stage-16-inline-vs-block-positioning.md" },
          { "id": "stage-17-z-index-and-stacking-context", "title": "z-index и контекст наложения", "mdPath": "/lessons/html-css/stage-17-z-index-and-stacking-context.md" },
          { "id": "stage-18-flexbox-axes-and-direction", "title": "Flexbox: оси и направление", "mdPath": "/lessons/html-css/stage-18-flexbox-axes-and-direction.md" },
          { "id": "stage-19-flexbox-flex-grow", "title": "Flexbox: flex-grow", "mdPath": "/lessons/html-css/stage-19-flexbox-flex-grow.md" },
          { "id": "stage-20-flexbox-basis-and-shrink", "title": "Flexbox: flex-basis и flex-shrink", "mdPath": "/lessons/html-css/stage-20-flexbox-basis-and-shrink.md" },
          { "id": "stage-21-flexbox-wrap", "title": "Flexbox: flex-wrap", "mdPath": "/lessons/html-css/stage-21-flexbox-wrap.md" },
          { "id": "stage-22-flexbox-alignment", "title": "Flexbox: выравнивание", "mdPath": "/lessons/html-css/stage-22-flexbox-alignment.md" },
          { "id": "stage-23-centering-elements", "title": "Центрирование элементов", "mdPath": "/lessons/html-css/stage-23-centering-elements.md" },
          { "id": "stage-24-flexbox-order", "title": "Изменение порядка в Flexbox", "mdPath": "/lessons/html-css/stage-24-flexbox-order.md" },
          { "id": "stage-25-flexbox-cross-browser", "title": "Flexbox в разных браузерах", "mdPath": "/lessons/html-css/stage-25-flexbox-cross-browser.md" },
          { "id": "stage-26-flexbox-grid-float-comparison", "title": "Flexbox, Grid и Float: сравнение", "mdPath": "/lessons/html-css/stage-26-flexbox-grid-float-comparison.md" },
          { "id": "stage-27-grids-columns-and-rows", "title": "Сетки из колонок и строк", "mdPath": "/lessons/html-css/stage-27-grids-columns-and-rows.md" },
          { "id": "stage-28-float-introduction", "title": "Свойство float: введение", "mdPath": "/lessons/html-css/stage-28-float-introduction.md" },
          { "id": "stage-29-float-parent-collapse", "title": "Схлопывание родителя при float", "mdPath": "/lessons/html-css/stage-29-float-parent-collapse.md" },
          { "id": "stage-30-float-limitations-and-alternatives", "title": "Ограничения float и альтернативы", "mdPath": "/lessons/html-css/stage-30-float-limitations-and-alternatives.md" },
          { "id": "stage-31-why-float-is-not-best-anymore", "title": "Почему float уже не лучший выбор", "mdPath": "/lessons/html-css/stage-31-why-float-is-not-best-anymore.md" },
          { "id": "stage-32-pseudo-classes-and-elements-intro", "title": "Псевдоклассы и псевдоэлементы: введение", "mdPath": "/lessons/html-css/stage-32-pseudo-classes-and-elements-intro.md" },
          { "id": "stage-33-pseudo-elements-types-and-uses", "title": "Типы псевдоэлементов и их задачи", "mdPath": "/lessons/html-css/stage-33-pseudo-elements-types-and-uses.md" },
          { "id": "stage-34-before-after-examples", "title": "::before и ::after: примеры", "mdPath": "/lessons/html-css/stage-34-before-after-examples.md" },
          { "id": "stage-35-pseudo-class-not", "title": "Псевдокласс :not()", "mdPath": "/lessons/html-css/stage-35-pseudo-class-not.md" },
          { "id": "stage-36-first-child-vs-first-of-type", "title": ":first-child vs :first-of-type", "mdPath": "/lessons/html-css/stage-36-first-child-vs-first-of-type.md" },
          { "id": "stage-37-positioning-browser-differences", "title": "Позиционирование: особенности браузеров", "mdPath": "/lessons/html-css/stage-37-positioning-browser-differences.md" },
          { "id": "stage-38-what-are-async-and-defer", "title": "Что такое async и defer?", "mdPath": "/lessons/html-css/stage-38-what-are-async-and-defer.md" },
          { "id": "stage-39-what-does-defer-attribute-do", "title": "Что делает атрибут defer?", "mdPath": "/lessons/html-css/stage-39-what-does-defer-attribute-do.md" },
          { "id": "stage-40-how-async-attribute-works", "title": "Как работает атрибут async?", "mdPath": "/lessons/html-css/stage-40-how-async-attribute-works.md" },
          { "id": "stage-41-async-and-defer-together", "title": "Async и defer одновременно", "mdPath": "/lessons/html-css/stage-41-async-and-defer-together.md" },
          { "id": "stage-42-what-is-fouc-and-why-important", "title": "FOUC: что это и почему важно", "mdPath": "/lessons/html-css/stage-42-what-is-fouc-and-why-important.md" },
          { "id": "stage-43-fouc-theory-and-practice", "title": "FOUC: теория и практика", "mdPath": "/lessons/html-css/stage-43-fouc-theory-and-practice.md" },
          { "id": "stage-44-content-loading-and-fouc", "title": "Загрузка контента и FOUC", "mdPath": "/lessons/html-css/stage-44-content-loading-and-fouc.md" },
          { "id": "stage-45-how-to-prevent-fouc", "title": "Как предотвратить FOUC", "mdPath": "/lessons/html-css/stage-45-how-to-prevent-fouc.md" },
          { "id": "stage-46-preload-and-prefetch", "title": "Preload и prefetch", "mdPath": "/lessons/html-css/stage-46-preload-and-prefetch.md" },
          { "id": "stage-47-critical-css", "title": "Критический CSS", "mdPath": "/lessons/html-css/stage-47-critical-css.md" }
        ]
      },
      {
        "id": "javascript",
        "title": "JavaScript",
        "lessons": [
          {
            "id": "vvedenie-v-instrumenty-razrabotchika",
            "title": "️ Введение в инструменты разработчика Chrome",
            "mdPath": "/lessons/javascript/vvedenie-v-instrumenty-razrabotchika.md"
          },
          {
            "id": "strogoe-i-nestrogoe-ravenstvo",
            "title": "️ Сравнение: `==` и `===`",
            "mdPath": "/lessons/javascript/strogoe-i-nestrogoe-ravenstvo.md"
          },
          {
            "id": "this-v-strelochnyh-funkciyah",
            "title": "`this` в стрелочных функциях: как это работает и в чём отличия",
            "mdPath": "/lessons/javascript/this-v-strelochnyh-funkciyah.md"
          },
          {
            "id": "privedenie-obektov-k-primitivam",
            "title": "Алгоритм Приведения Объектов к Примитивам",
            "mdPath": "/lessons/javascript/privedenie-obektov-k-primitivam.md"
          },
          {
            "id": "analiz-proizvoditelnosti-stranicy-v-devtools",
            "title": "Анализ производительности страницы с помощью Chrome DevTools",
            "mdPath": "/lessons/javascript/analiz-proizvoditelnosti-stranicy-v-devtools.md"
          },
          {
            "id": "asinhronnoe-programmirovanie",
            "title": "Асинхронное программирование: Основы и Примеры",
            "mdPath": "/lessons/javascript/asinhronnoe-programmirovanie.md"
          },
          {
            "id": "asinhronnye-zaprosy",
            "title": "Асинхронные запросы",
            "mdPath": "/lessons/javascript/asinhronnye-zaprosy.md"
          },
          {
            "id": "bezopasnost-pri-hranenii-dannyh-v-brauzere",
            "title": "Безопасность при хранении данных в браузере",
            "mdPath": "/lessons/javascript/bezopasnost-pri-hranenii-dannyh-v-brauzere.md"
          },
          {
            "id": "validaciya-email-regulyarnymi-vyrazheniyami",
            "title": "Валидация email с помощью регулярных выражений в JavaScript",
            "mdPath": "/lessons/javascript/validaciya-email-regulyarnymi-vyrazheniyami.md"
          },
          {
            "id": "vvedenie-v-bazovye-operatory",
            "title": "Введение в базовые операторы JavaScript",
            "mdPath": "/lessons/javascript/vvedenie-v-bazovye-operatory.md"
          },
          {
            "id": "vvedenie-v-keshirovanie",
            "title": "Введение в кэширование: что это и зачем нужно",
            "mdPath": "/lessons/javascript/vvedenie-v-keshirovanie.md"
          },
          {
            "id": "vvedenie-v-javascript-dlya-brauzera",
            "title": "Введение в JavaScript для браузера (JS-Browser)",
            "mdPath": "/lessons/javascript/vvedenie-v-javascript-dlya-brauzera.md"
          },
          {
            "id": "vvirtualnyi-dom-i-kak-on-svyazan-s-realnym-dom",
            "title": "Виртуальный DOM и как он связан с реальным DOM?",
            "mdPath": "/lessons/javascript/vvirtualnyi-dom-i-kak-on-svyazan-s-realnym-dom.md"
          },
          {
            "id": "blokirovat-vse-cookies",
            "title": "Влияние настройки \"Блокировать все cookies\" на `localStorage` и `sessionStorage`",
            "mdPath": "/lessons/javascript/blokirovat-vse-cookies.md"
          },
          {
            "id": "vsplytie-i-zahvat-sobytii-v-dom",
            "title": "Всплытие и захват событий в DOM",
            "mdPath": "/lessons/javascript/vsplytie-i-zahvat-sobytii-v-dom.md"
          },
          {
            "id": "7vsplytie-sobytii-v-dom",
            "title": "Всплытие событий в DOM",
            "mdPath": "/lessons/javascript/7vsplytie-sobytii-v-dom.md"
          },
          {
            "id": "osnovy-i-rabota-v-kode",
            "title": "Деструктуризация: Полное руководство с примерами",
            "mdPath": "/lessons/javascript/osnovy-i-rabota-v-kode.md"
          },
          {
            "id": "dostup-k-atributam-elementa-dom",
            "title": "Доступ к атрибутам элемента DOM",
            "mdPath": "/lessons/javascript/dostup-k-atributam-elementa-dom.md"
          },
          {
            "id": "zhadnye-i-lenivye-kvantifikatory",
            "title": "Жадные и ленивые квантификаторы в регулярных выражениях",
            "mdPath": "/lessons/javascript/zhadnye-i-lenivye-kvantifikatory.md"
          },
          {
            "id": "zagolovki-servernogo-zaprosa-devtools",
            "title": "Заголовки серверного запроса DevTools",
            "mdPath": "/lessons/javascript/zagolovki-servernogo-zaprosa-devtools.md"
          },
          {
            "id": "zamykaniya",
            "title": "Замыкания",
            "mdPath": "/lessons/javascript/zamykaniya.md"
          },
          {
            "id": "ispolzovanie-vkladki-network-v-devtools",
            "title": "Использование вкладки \"Network\" в Chrome DevTools для анализа загрузки ресурсов",
            "mdPath": "/lessons/javascript/ispolzovanie-vkladki-network-v-devtools.md"
          },
          {
            "id": "ispolzovanie-iteratora",
            "title": "Использование итератора в JavaScript",
            "mdPath": "/lessons/javascript/ispolzovanie-iteratora.md"
          },
          {
            "id": "ispolzovanie-metodov-konteksta",
            "title": "Использование методов контекста с объектом в JavaScript",
            "mdPath": "/lessons/javascript/ispolzovanie-metodov-konteksta.md"
          },
          {
            "id": "kak-analizirovat-utechki-pamyati-v-devtools",
            "title": "Как анализировать утечки памяти в Chrome DevTools",
            "mdPath": "/lessons/javascript/kak-analizirovat-utechki-pamyati-v-devtools.md"
          },
          {
            "id": "kross-domennye-zaprosy",
            "title": "Как ведут себя `sessionStorage`, `localStorage` и `cookies` при **кросс-доменных запросах (CORS)**",
            "mdPath": "/lessons/javascript/kross-domennye-zaprosy.md"
          },
          {
            "id": "dostupnost-veb-stranicy-s-devtools",
            "title": "Как вы проверяете доступность веб-страницы с помощью инструментов разработчика Chrome?",
            "mdPath": "/lessons/javascript/dostupnost-veb-stranicy-s-devtools.md"
          },
          {
            "id": "application-v-devtools",
            "title": "Как использовать вкладку \"Application\" в Chrome DevTools для работы с хранилищем данных",
            "mdPath": "/lessons/javascript/application-v-devtools.md"
          },
          {
            "id": "izmereniya-vypolneniya-koda-s-devtools",
            "title": "Как использовать Chrome DevTools для измерения времени выполнения кода",
            "mdPath": "/lessons/javascript/izmereniya-vypolneniya-koda-s-devtools.md"
          },
          {
            "id": "devtools-dlya-analiza",
            "title": "Как использовать DevTools для анализа и отладки сетевых запросов (вкладка Network)",
            "mdPath": "/lessons/javascript/devtools-dlya-analiza.md"
          },
          {
            "id": "sw-dlya-keshirovaniya-v-oflain-rezhime",
            "title": "Как использовать Service Workers для кэширования веб-ресурсов в офлайн-режиме",
            "mdPath": "/lessons/javascript/sw-dlya-keshirovaniya-v-oflain-rezhime.md"
          },
          {
            "id": "obhod-ogranicheniya-razmera",
            "title": "Как обойти ограничение размера при использовании cookies, localStorage и sessionStorage",
            "mdPath": "/lessons/javascript/obhod-ogranicheniya-razmera.md"
          },
          {
            "id": "dostupnost-veb-stranicy-s-pomoschyu-devtools",
            "title": "Как проверить доступность веб-страницы с помощью Chrome DevTools",
            "mdPath": "/lessons/javascript/dostupnost-veb-stranicy-s-pomoschyu-devtools.md"
          },
          {
            "id": "rabota-keshirovanie-v-brauzere",
            "title": "Как работает кэширование в браузере и как JavaScript может использовать это для оптимизации производительности",
            "mdPath": "/lessons/javascript/rabota-keshirovanie-v-brauzere.md"
          },
          {
            "id": "localstorage-i-sessionstorage-dlya-keshirovaniya",
            "title": "Как JavaScript использует localStorage и sessionStorage для кэширования",
            "mdPath": "/lessons/javascript/localstorage-i-sessionstorage-dlya-keshirovaniya.md"
          },
          {
            "id": "kogda-strelochnye-funkcii-ne-pohodyat",
            "title": "Когда стрелочные функции не подходят?",
            "mdPath": "/lessons/javascript/kogda-strelochnye-funkcii-ne-pohodyat.md"
          },
          {
            "id": "kontrol-keshirovaniya-staticheskih-resursov",
            "title": "Контроль кэширования статических ресурсов в JavaScript-приложениях",
            "mdPath": "/lessons/javascript/kontrol-keshirovaniya-staticheskih-resursov.md"
          },
          {
            "id": "keshirovanie-na-storone-klienta-i-servera",
            "title": "Кэширование на стороне клиента и сервера: различия и влияние на JavaScript-приложения",
            "mdPath": "/lessons/javascript/keshirovanie-na-storone-klienta-i-servera.md"
          },
          {
            "id": "operatory-i",
            "title": "Логические операторы `&&` и `||` в JavaScript",
            "mdPath": "/lessons/javascript/operatory-i.md"
          },
          {
            "id": "mery-bezopasnosti-pri-ispolzovanii-cookies",
            "title": "Меры безопасности при использовании Cookies",
            "mdPath": "/lessons/javascript/mery-bezopasnosti-pri-ispolzovanii-cookies.md"
          },
          {
            "id": "metody-dostupa-k-dom-elementam",
            "title": "Методы доступа к DOM-элементам",
            "mdPath": "/lessons/javascript/metody-dostupa-k-dom-elementam.md"
          },
          {
            "id": "mehanizm-iteracii-i-rabota-generatorov",
            "title": "Механизм итерации и работа генераторов",
            "mdPath": "/lessons/javascript/mehanizm-iteracii-i-rabota-generatorov.md"
          },
          {
            "id": "medlennyi-internet-v-devtools",
            "title": "Моделирование медленного интернет-соединение в Chrome DevTools",
            "mdPath": "/lessons/javascript/medlennyi-internet-v-devtools.md"
          },
          {
            "id": "modelirovanie-mobilnyh-ustroistv-v-devtools",
            "title": "Моделирование мобильных устройств в Chrome DevTools",
            "mdPath": "/lessons/javascript/modelirovanie-mobilnyh-ustroistv-v-devtools.md"
          },
          {
            "id": "obzor-metodov-primeneniya-stilei-cherez-js",
            "title": "Обзор методов применения стилей через JavaScript",
            "mdPath": "/lessons/javascript/obzor-metodov-primeneniya-stilei-cherez-js.md"
          },
          {
            "id": "leksicheskoe-okruzhenie-i-ov",
            "title": "Область видимости и лексическое окружение",
            "mdPath": "/lessons/javascript/leksicheskoe-okruzhenie-i-ov.md"
          },
          {
            "id": "obrabotka-oshibok",
            "title": "Обработка ошибок в асинхронном коде",
            "mdPath": "/lessons/javascript/obrabotka-oshibok.md"
          },
          {
            "id": "obratnye-ssylki",
            "title": "Обратные ссылки (backreferences) в регулярных выражениях",
            "mdPath": "/lessons/javascript/obratnye-ssylki.md"
          },
          {
            "id": "operatory-i-2",
            "title": "Операторы ?? и ?.",
            "mdPath": "/lessons/javascript/operatory-i-2.md"
          },
          {
            "id": "operatory-prisvaivaniya",
            "title": "Операторы присваивания",
            "mdPath": "/lessons/javascript/operatory-prisvaivaniya.md"
          },
          {
            "id": "operatory-sravneniya",
            "title": "Операторы сравнения",
            "mdPath": "/lessons/javascript/operatory-sravneniya.md"
          },
          {
            "id": "metasimvoly-i-primery",
            "title": "Основные метасимволы регулярных выражений в JavaScript",
            "mdPath": "/lessons/javascript/metasimvoly-i-primery.md"
          },
          {
            "id": "osnovy-obektov-i-raboty-s-kontekstom",
            "title": "Основы работы с методами `call`, `apply` и `bind`",
            "mdPath": "/lessons/javascript/osnovy-obektov-i-raboty-s-kontekstom.md"
          },
          {
            "id": "osnovy-ciklov",
            "title": "Основы циклов в JavaScript",
            "mdPath": "/lessons/javascript/osnovy-ciklov.md"
          },
          {
            "id": "match-i-poisk-sovpadeniy",
            "title": "Поиск совпадений с регулярным выражением: методы `match()` и `exec()` в JavaScript",
            "mdPath": "/lessons/javascript/match-i-poisk-sovpadeniy.md"
          },
          {
            "id": "arguments-net-v-strelochnyh-funkciyah",
            "title": "Почему в стрелочных функциях убрали псевдомассив `arguments`?",
            "mdPath": "/lessons/javascript/arguments-net-v-strelochnyh-funkciyah.md"
          },
          {
            "id": "privedenie-tipov",
            "title": "Приведение типов",
            "mdPath": "/lessons/javascript/privedenie-tipov.md"
          },
          {
            "id": "primitivnye-tipy-dannyh",
            "title": "Примитивные типы данных",
            "mdPath": "/lessons/javascript/primitivnye-tipy-dannyh.md"
          },
          {
            "id": "problemy-s-keshirovanie",
            "title": "Проблемы с кэшированием в JavaScript и как их избежать",
            "mdPath": "/lessons/javascript/problemy-s-keshirovanie.md"
          },
          {
            "id": "dobavlenie-udalenie-i-zamena-elementov",
            "title": "Работа с DOM: добавление, удаление и замена элементов",
            "mdPath": "/lessons/javascript/dobavlenie-udalenie-i-zamena-elementov.md"
          },
          {
            "id": "rabota-s-promise-i-metodami",
            "title": "Работа с Promise и Асинхронными Операциями в JavaScript",
            "mdPath": "/lessons/javascript/rabota-s-promise-i-metodami.md"
          },
          {
            "id": "split-i-razdelenie-strok",
            "title": "Разделение строк с помощью регулярных выражений в JavaScript",
            "mdPath": "/lessons/javascript/split-i-razdelenie-strok.md"
          },
          {
            "id": "razlichie-peremennyh-i-rabota",
            "title": "Различия между `var`, `let` и `const`",
            "mdPath": "/lessons/javascript/razlichie-peremennyh-i-rabota.md"
          },
          {
            "id": "operatory-inkrement-i-dekrement",
            "title": "Разница между `++i` и `i++` в JavaScript",
            "mdPath": "/lessons/javascript/operatory-inkrement-i-dekrement.md"
          },
          {
            "id": "raznica-mezhdu-innertext-i-innerhtml",
            "title": "Разница между `innerText` и `innerHTML` в JavaScript",
            "mdPath": "/lessons/javascript/raznica-mezhdu-innertext-i-innerhtml.md"
          },
          {
            "id": "vvedenie",
            "title": "Регулярные выражения в JavaScript: что это и зачем нужны",
            "mdPath": "/lessons/javascript/vvedenie.md"
          },
          {
            "id": "sozdanie-i-sintaksis",
            "title": "Создание регулярных выражений в JavaScript",
            "mdPath": "/lessons/javascript/sozdanie-i-sintaksis.md"
          },
          {
            "id": "osnovy-strelochnyh-funkcii",
            "title": "Стрелочные функции и основные моменты",
            "mdPath": "/lessons/javascript/osnovy-strelochnyh-funkcii.md"
          },
          {
            "id": "ternarnyi-operator",
            "title": "Тернарный оператор в JavaScript",
            "mdPath": "/lessons/javascript/ternarnyi-operator.md"
          },
          {
            "id": "flagi-v-regulyarnyh-vyrazheniyah",
            "title": "Флаги в регулярных выражениях JavaScript",
            "mdPath": "/lessons/javascript/flagi-v-regulyarnyh-vyrazheniyah.md"
          },
          {
            "id": "funkcii-i-argumenty",
            "title": "Функции",
            "mdPath": "/lessons/javascript/funkcii-i-argumenty.md"
          },
          {
            "id": "obschie-voprosy",
            "title": "Функции, Область Видимости, Замыкания, `this` и Асинхронность",
            "mdPath": "/lessons/javascript/obschie-voprosy.md"
          },
          {
            "id": "v-kakih-sluchayah-ispolzovat-ls-ss-cookies",
            "title": "Что выбрать: Cookies, LocalStorage или SessionStorage?",
            "mdPath": "/lessons/javascript/v-kakih-sluchayah-ispolzovat-ls-ss-cookies.md"
          },
          {
            "id": "operator",
            "title": "Что делает оператор `&` в JavaScript?",
            "mdPath": "/lessons/javascript/operator.md"
          },
          {
            "id": "metod-addeventlistener",
            "title": "Что принимает метод `addEventListener` и как это работает?",
            "mdPath": "/lessons/javascript/metod-addeventlistener.md"
          },
          {
            "id": "autentifikaciya-polzovatelya",
            "title": "Что такое \"аутентификация пользователя\"?",
            "mdPath": "/lessons/javascript/autentifikaciya-polzovatelya.md"
          },
          {
            "id": "async-i-await",
            "title": "Что такое `async/await` и как их использовать?",
            "mdPath": "/lessons/javascript/async-i-await.md"
          },
          {
            "id": "vvedenie-v-asinhronnyi-kod",
            "title": "Что такое асинхронное программирование?",
            "mdPath": "/lessons/javascript/vvedenie-v-asinhronnyi-kod.md"
          },
          {
            "id": "vvedenie-v-destrukturizaciyu",
            "title": "Что такое деструктуризация?",
            "mdPath": "/lessons/javascript/vvedenie-v-destrukturizaciyu.md"
          },
          {
            "id": "vvedenie-v-iterator-i-generator",
            "title": "Что такое итераторы и генераторы?",
            "mdPath": "/lessons/javascript/vvedenie-v-iterator-i-generator.md"
          },
          {
            "id": "vvedenie-v-peremennye-let-const-var",
            "title": "Что такое переменные?",
            "mdPath": "/lessons/javascript/vvedenie-v-peremennye-let-const-var.md"
          },
          {
            "id": "sobytie-v-javascript-i-event-handling",
            "title": "Что такое событие в JavaScript и как работает Event Handling?",
            "mdPath": "/lessons/javascript/sobytie-v-javascript-i-event-handling.md"
          },
          {
            "id": "vvedenie-sobytiya",
            "title": "Что такое события в JavaScript?",
            "mdPath": "/lessons/javascript/vvedenie-sobytiya.md"
          },
          {
            "id": "vvedenie-v-rabotu-s-tipami-dannyh",
            "title": "Что такое типы данных?",
            "mdPath": "/lessons/javascript/vvedenie-v-rabotu-s-tipami-dannyh.md"
          },
          {
            "id": "vvedenie-v-cikly-plyusy-minusy-i-osobennosti",
            "title": "Что такое циклы в JavaScript?",
            "mdPath": "/lessons/javascript/vvedenie-v-cikly-plyusy-minusy-i-osobennosti.md"
          },
          {
            "id": "cookies-i-rabota-s-nimi-v-devtools",
            "title": "Что такое cookies и как с ними работать в Chrome DevTools",
            "mdPath": "/lessons/javascript/cookies-i-rabota-s-nimi-v-devtools.md"
          },
          {
            "id": "vvedenie-v-js-core",
            "title": "Что такое JavaScript Core?",
            "mdPath": "/lessons/javascript/vvedenie-v-js-core.md"
          },
          {
            "id": "plyusy-i-minusy-promise-async-await-callback",
            "title": "Callback-функции, Promise и async/await: сравнение, преимущества и недостатки",
            "mdPath": "/lessons/javascript/plyusy-i-minusy-promise-async-await-callback.md"
          },
          {
            "id": "hoistingpodnyatie",
            "title": "Hoisting (Поднятие)",
            "mdPath": "/lessons/javascript/hoistingpodnyatie.md"
          },
          {
            "id": "vvedenie-v-hranilische",
            "title": "LocalStorage, SessionStorage и Cookies: различия, ограничения и подводные камни",
            "mdPath": "/lessons/javascript/vvedenie-v-hranilische.md"
          }
        ]
      },
      {
        "id": "setevoe-vzaimodeistvie",
        "title": "Сетевое взаимодействие",
        "lessons": [
          {
            "id": "bazovye-http-metody-i-ih-naznachenie",
            "title": "Базовые HTTP методы: теория, примеры",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/bazovye-http-metody-i-ih-naznachenie.md"
          },
          {
            "id": "bezopasnost-rest-api",
            "title": "Безопасность REST API: полное руководство",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/bezopasnost-rest-api.md"
          },
          {
            "id": "vvedenie-v-kody-sostoyaniya-http",
            "title": "Введение в коды состояния HTTP",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/vvedenie-v-kody-sostoyaniya-http.md"
          },
          {
            "id": "vvedenie-v-http-i-https",
            "title": "Введение в HTTP и HTTPS",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/vvedenie-v-http-i-https.md"
          },
          {
            "id": "vvedenie-v-http-metody",
            "title": "Введение в HTTP методы",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/vvedenie-v-http-metody.md"
          },
          {
            "id": "vvedenie-v-rest-api",
            "title": "Введение в REST API",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/vvedenie-v-rest-api.md"
          },
          {
            "id": "versionirovanie-api-v-rest",
            "title": "Версионирование API в REST: подходы и практика",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/versionirovanie-api-v-rest.md"
          },
          {
            "id": "zagruzka-bolshih-failov-v-rest-api",
            "title": "Загрузка больших файлов в REST API: методы и практика",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/zagruzka-bolshih-failov-v-rest-api.md"
          },
          {
            "id": "idempotentnost-v-rest-api",
            "title": "Идемпотентность в REST API: теория и практика",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/idempotentnost-v-rest-api.md"
          },
          {
            "id": "get-i-post-na-praktike",
            "title": "Использование HTTP методов GET и POST на практике",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/get-i-post-na-praktike.md"
          },
          {
            "id": "klyuchevye-otlichiya-http-i-https",
            "title": "Ключевые отличия HTTP и HTTPS: полное руководство",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/klyuchevye-otlichiya-http-i-https.md"
          },
          {
            "id": "keshirovanie-v-rest-api",
            "title": "Кэширование в REST API: принципы и практика",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/keshirovanie-v-rest-api.md"
          },
          {
            "id": "nastroika-servera-dlya-raboty-s-https",
            "title": "Настройка сервера для работы с HTTPS",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/nastroika-servera-dlya-raboty-s-https.md"
          },
          {
            "id": "nedeistvitelnye-i-istekshie-sertifikaty",
            "title": "Недействительные и истекшие сертификаты в HTTPS",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/nedeistvitelnye-i-istekshie-sertifikaty.md"
          },
          {
            "id": "obrabotka-oshibok-v-rest-api",
            "title": "Обработка ошибок в REST API: принципы и практика",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/obrabotka-oshibok-v-rest-api.md"
          },
          {
            "id": "ogranichenie-dostupa-v-rest-api",
            "title": "Ограничение доступа в REST API: методы и практика",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/ogranichenie-dostupa-v-rest-api.md"
          },
          {
            "id": "osnovnye-http-metody-v-rest-api",
            "title": "Основные HTTP методы в REST API: полный обзор",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/osnovnye-http-metody-v-rest-api.md"
          },
          {
            "id": "process-rukopozhatiya-v-https",
            "title": "Процесс рукопожатия в HTTPS: детальное руководство",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/process-rukopozhatiya-v-https.md"
          },
          {
            "id": "patch-i-put-razlichiya-i-primery",
            "title": "Различия между HTTP методами PATCH и PUT",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/patch-i-put-razlichiya-i-primery.md"
          },
          {
            "id": "post-i-put-razlichiya-i-primery",
            "title": "Различия между HTTP методами POST и PUT",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/post-i-put-razlichiya-i-primery.md"
          },
          {
            "id": "razlichiya-mezhdu-rest-i-soap",
            "title": "Различия между REST и SOAP: полное сравнение",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/razlichiya-mezhdu-rest-i-soap.md"
          },
          {
            "id": "resursy-v-rest",
            "title": "Ресурсы в REST: идентификация и представление",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/resursy-v-rest.md"
          },
          {
            "id": "chto-takoe-rest-i-rest-api",
            "title": "Что такое REST и REST API: теория и практика",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/chto-takoe-rest-i-rest-api.md"
          },
          {
            "id": "shifrovanie-v-https",
            "title": "Шифрование в HTTPS: технологии и принципы работы",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/shifrovanie-v-https.md"
          },
          {
            "id": "crud-operacii-i-http-metody",
            "title": "CRUD операции и HTTP методы в REST API",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/crud-operacii-i-http-metody.md"
          },
          {
            "id": "hateoas-principy-v-rest",
            "title": "HATEOAS принципы в REST: гипермедиа как движок состояния",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/hateoas-principy-v-rest.md"
          },
          {
            "id": "301-moved-permanently-teoriya-i-praktika",
            "title": "HTTP 301 Moved Permanently: теория, SEO и практика",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/301-moved-permanently-teoriya-i-praktika.md"
          },
          {
            "id": "302-found-vremennoe-perenapravlenie",
            "title": "HTTP 302 Found: временное перенаправление и практика",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/302-found-vremennoe-perenapravlenie.md"
          },
          {
            "id": "401403404-razlichiya-i-praktika",
            "title": "HTTP 401, 403, 404: различия, причины и практика",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/401403404-razlichiya-i-praktika.md"
          },
          {
            "id": "404-not-found-oshibka-i-obrabotka",
            "title": "HTTP 404 Not Found: теория, причины и обработка",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/404-not-found-oshibka-i-obrabotka.md"
          },
          {
            "id": "delete-metod-i-udalenie-dannyh",
            "title": "HTTP метод DELETE: удаление данных на сервере",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/delete-metod-i-udalenie-dannyh.md"
          },
          {
            "id": "redirekty-3xx-status-kody",
            "title": "HTTP редиректы (3xx): теория, типы и практика",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/redirekty-3xx-status-kody.md"
          },
          {
            "id": "status-kody-200-201-204-razlichiya-i-primery",
            "title": "HTTP статус-коды 200, 201, 204: различия и практика",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/status-kody-200-201-204-razlichiya-i-primery.md"
          },
          {
            "id": "oshibki-klienta-4xx-status-kody",
            "title": "HTTP статус-коды ошибок клиента (4xx): теория и практика",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/oshibki-klienta-4xx-status-kody.md"
          },
          {
            "id": "http-status-kody-i-ih-znacheniya",
            "title": "HTTP-статус-коды: категории, значения и практика",
            "mdPath": "/lessons/setevoe-vzaimodeistvie/http-status-kody-i-ih-znacheniya.md"
          }
        ]
      },
      {
        "id": "fundamentalnye-navyki",
        "title": "Фундаментальные навыки",
        "lessons": [
          {
            "id": "yagni-vliyanie-na-proektirovanie-funkcionalnosti",
            "title": "Как принцип YAGNI влияет на проектирование функциональности",
            "mdPath": "/lessons/fundamentalnye-navyki/yagni-vliyanie-na-proektirovanie-funkcionalnosti.md"
          },
          {
            "id": "dry-ogranicheniya-i-lovushki",
            "title": "Когда принцип DRY может быть вреден: ограничения и ловушки",
            "mdPath": "/lessons/fundamentalnye-navyki/dry-ogranicheniya-i-lovushki.md"
          },
          {
            "id": "kiss-kogda-slozhnost-neopravdanna-i-kak-uprostit",
            "title": "Когда сложность в коде становится неоправданной? Как принцип KISS помогает упростить",
            "mdPath": "/lessons/fundamentalnye-navyki/kiss-kogda-slozhnost-neopravdanna-i-kak-uprostit.md"
          },
          {
            "id": "yagni-primer-narusheniya-i-vyvody",
            "title": "Пример нарушения принципа YAGNI и его последствия",
            "mdPath": "/lessons/fundamentalnye-navyki/yagni-primer-narusheniya-i-vyvody.md"
          },
          {
            "id": "kiss-javascript-primer-uproscheniya-koda",
            "title": "Пример упрощения кода на JavaScript с помощью принципа KISS",
            "mdPath": "/lessons/fundamentalnye-navyki/kiss-javascript-primer-uproscheniya-koda.md"
          },
          {
            "id": "dry-javascript-primenenie-i-praktika",
            "title": "Принцип DRY и его применение в JavaScript",
            "mdPath": "/lessons/fundamentalnye-navyki/dry-javascript-primenenie-i-praktika.md"
          },
          {
            "id": "yagni-javascript-primenenie-i-praktika",
            "title": "Принцип YAGNI и его применение в JavaScript",
            "mdPath": "/lessons/fundamentalnye-navyki/yagni-javascript-primenenie-i-praktika.md"
          },
          {
            "id": "vvedenie-3",
            "title": "DRY (Don't Repeat Yourself): что это и почему важно",
            "mdPath": "/lessons/fundamentalnye-navyki/vvedenie-3.md"
          },
          {
            "id": "vvedenie",
            "title": "KISS (Keep It Simple, Stupid): что это и почему важно",
            "mdPath": "/lessons/fundamentalnye-navyki/vvedenie.md"
          },
          {
            "id": "kiss-javascript-primenenie-i-praktika",
            "title": "KISS в программировании на JavaScript",
            "mdPath": "/lessons/fundamentalnye-navyki/kiss-javascript-primenenie-i-praktika.md"
          },
          {
            "id": "vvedenie-2",
            "title": "YAGNI (You Aren't Gonna Need It): что это и почему важно",
            "mdPath": "/lessons/fundamentalnye-navyki/vvedenie-2.md"
          }
        ]
      },
      {
        "id": "inzhenernaya-kultura",
        "title": "Инженерная культура",
        "lessons": [
          {
            "id": "avtomaticheskaya-proverka-koda-s-pomoschyu-linterov",
            "title": "Автоматическая проверка кода с помощью линтеров",
            "mdPath": "/lessons/inzhenernaya-kultura/avtomaticheskaya-proverka-koda-s-pomoschyu-linterov.md"
          },
          {
            "id": "vvedenie",
            "title": "Введение в предотвращение неработающего кода на code review",
            "mdPath": "/lessons/inzhenernaya-kultura/vvedenie.md"
          },
          {
            "id": "vvedenie-v-code-review",
            "title": "Введение в code review",
            "mdPath": "/lessons/inzhenernaya-kultura/vvedenie-v-code-review.md"
          },
          {
            "id": "gotovnost-koda-k-code-review",
            "title": "Готовность кода к code review",
            "mdPath": "/lessons/inzhenernaya-kultura/gotovnost-koda-k-code-review.md"
          },
          {
            "id": "instrumenty-dlya-provedeniya-code-review",
            "title": "Инструменты для проведения code review",
            "mdPath": "/lessons/inzhenernaya-kultura/instrumenty-dlya-provedeniya-code-review.md"
          },
          {
            "id": "kak-davat-obratnuyu-svyaz-vo-vremya-code-review",
            "title": "Как давать обратную связь во время code review",
            "mdPath": "/lessons/inzhenernaya-kultura/kak-davat-obratnuyu-svyaz-vo-vremya-code-review.md"
          },
          {
            "id": "kak-spravitsya-s-neponyatnym-kodom",
            "title": "Как справиться с непонятным кодом во время code review",
            "mdPath": "/lessons/inzhenernaya-kultura/kak-spravitsya-s-neponyatnym-kodom.md"
          },
          {
            "id": "navyki-dlya-effektivnogo-code-review",
            "title": "Навыки для эффективного code review",
            "mdPath": "/lessons/inzhenernaya-kultura/navyki-dlya-effektivnogo-code-review.md"
          },
          {
            "id": "osnovnye-aspekty-code-review",
            "title": "Основные аспекты code review",
            "mdPath": "/lessons/inzhenernaya-kultura/osnovnye-aspekty-code-review.md"
          },
          {
            "id": "proverka-koda-pered-otpravkoi-na-review",
            "title": "Проверка кода перед отправкой на review",
            "mdPath": "/lessons/inzhenernaya-kultura/proverka-koda-pered-otpravkoi-na-review.md"
          },
          {
            "id": "strategiya-effektivnosti-code-review",
            "title": "Стратегия эффективности code review",
            "mdPath": "/lessons/inzhenernaya-kultura/strategiya-effektivnosti-code-review.md"
          },
          {
            "id": "tipy-testov-dlya-proverki-koda",
            "title": "Типы тестов для проверки кода перед отправкой на review",
            "mdPath": "/lessons/inzhenernaya-kultura/tipy-testov-dlya-proverki-koda.md"
          },
          {
            "id": "code-review-dlya-uluchsheniya-proizvoditelnosti",
            "title": "Code review для улучшения производительности системы",
            "mdPath": "/lessons/inzhenernaya-kultura/code-review-dlya-uluchsheniya-proizvoditelnosti.md"
          }
        ]
      },
      {
        "id": "npm",
        "title": "NPM",
        "lessons": [
          {
            "id": "vvedenie-2",
            "title": "Введение в разницу между npm install и npm ci",
            "mdPath": "/lessons/npm/vvedenie-2.md"
          },
          {
            "id": "vvedenie",
            "title": "Введение в установку npm модулей",
            "mdPath": "/lessons/npm/vvedenie.md"
          },
          {
            "id": "vvedenie-3",
            "title": "Введение в package.json",
            "mdPath": "/lessons/npm/vvedenie-3.md"
          },
          {
            "id": "vvedenie-v-semver",
            "title": "Введение в Semver",
            "mdPath": "/lessons/npm/vvedenie-v-semver.md"
          },
          {
            "id": "vliyanie-na-faily-zavisimostei",
            "title": "Влияние на файлы зависимостей",
            "mdPath": "/lessons/npm/vliyanie-na-faily-zavisimostei.md"
          },
          {
            "id": "globalnye-i-lokalnye-npm-moduli",
            "title": "Глобальные и локальные npm модули",
            "mdPath": "/lessons/npm/globalnye-i-lokalnye-npm-moduli.md"
          },
          {
            "id": "diapazony-versii-v-packagejson",
            "title": "Диапазоны версий в package.json",
            "mdPath": "/lessons/npm/diapazony-versii-v-packagejson.md"
          },
          {
            "id": "kogda-uvelichivat-mazhornuyu-versiyu",
            "title": "Когда увеличивать мажорную версию в Semver",
            "mdPath": "/lessons/npm/kogda-uvelichivat-mazhornuyu-versiyu.md"
          },
          {
            "id": "komanda-npm-ci",
            "title": "Команда npm ci",
            "mdPath": "/lessons/npm/komanda-npm-ci.md"
          },
          {
            "id": "komanda-npm-i",
            "title": "Команда npm i",
            "mdPath": "/lessons/npm/komanda-npm-i.md"
          },
          {
            "id": "komandy-dlya-ustanovki-npm-modulei",
            "title": "Команды для установки npm модулей",
            "mdPath": "/lessons/npm/komandy-dlya-ustanovki-npm-modulei.md"
          },
          {
            "id": "nulevoi-major-v-semver",
            "title": "Нулевой MAJOR в Semver",
            "mdPath": "/lessons/npm/nulevoi-major-v-semver.md"
          },
          {
            "id": "obnovlenie-versii-npm-modulei",
            "title": "Обновление версий npm модулей",
            "mdPath": "/lessons/npm/obnovlenie-versii-npm-modulei.md"
          },
          {
            "id": "obratnaya-sovmestimost-minornyh-versii",
            "title": "Обратная совместимость минорных версий",
            "mdPath": "/lessons/npm/obratnaya-sovmestimost-minornyh-versii.md"
          },
          {
            "id": "operatory-diapazona-versii",
            "title": "Операторы диапазона версий npm",
            "mdPath": "/lessons/npm/operatory-diapazona-versii.md"
          },
          {
            "id": "osnovnye-komponenty-versii",
            "title": "Основные компоненты версии в Semver",
            "mdPath": "/lessons/npm/osnovnye-komponenty-versii.md"
          },
          {
            "id": "osnovnye-razlichiya-mezhdu-komandami",
            "title": "Основные различия между командами npm i и npm ci",
            "mdPath": "/lessons/npm/osnovnye-razlichiya-mezhdu-komandami.md"
          },
          {
            "id": "preimuschestva-ispolzovaniya-semver",
            "title": "Преимущества использования Semver",
            "mdPath": "/lessons/npm/preimuschestva-ispolzovaniya-semver.md"
          },
          {
            "id": "preimuschestva-npm-ci-v-ci-cd",
            "title": "Преимущества npm ci в CI/CD",
            "mdPath": "/lessons/npm/preimuschestva-npm-ci-v-ci-cd.md"
          },
          {
            "id": "primenenie-semver-v-proekte",
            "title": "Применение Semver в проекте",
            "mdPath": "/lessons/npm/primenenie-semver-v-proekte.md"
          },
          {
            "id": "primery-uvelicheniya-versii",
            "title": "Примеры увеличения версий в Semver",
            "mdPath": "/lessons/npm/primery-uvelicheniya-versii.md"
          },
          {
            "id": "problemy-s-npm-ci-i-ih-resheniya",
            "title": "Проблемы с npm ci и их решения",
            "mdPath": "/lessons/npm/problemy-s-npm-ci-i-ih-resheniya.md"
          },
          {
            "id": "problemy-npm-i-ih-resheniya",
            "title": "Проблемы npm и их решения",
            "mdPath": "/lessons/npm/problemy-npm-i-ih-resheniya.md"
          },
          {
            "id": "proverka-ustanovlennyh-npm-modulei",
            "title": "Проверка установленных npm модулей",
            "mdPath": "/lessons/npm/proverka-ustanovlennyh-npm-modulei.md"
          },
          {
            "id": "raznica-mezhdu-save-i-save-dev",
            "title": "Разница между --save и --save-dev",
            "mdPath": "/lessons/npm/raznica-mezhdu-save-i-save-dev.md"
          },
          {
            "id": "raznica-mezhdu-dependencies-i-devdependencies",
            "title": "Разница между dependencies и devDependencies",
            "mdPath": "/lessons/npm/raznica-mezhdu-dependencies-i-devdependencies.md"
          },
          {
            "id": "reliz-kandidaty-v-semver",
            "title": "Релиз-кандидаты в Semver",
            "mdPath": "/lessons/npm/reliz-kandidaty-v-semver.md"
          },
          {
            "id": "sekciya-scripts-v-packagejson",
            "title": "Секция scripts в package.json",
            "mdPath": "/lessons/npm/sekciya-scripts-v-packagejson.md"
          },
          {
            "id": "sposoby-sozdaniya-packagejson",
            "title": "Способы создания package.json",
            "mdPath": "/lessons/npm/sposoby-sozdaniya-packagejson.md"
          },
          {
            "id": "struktura-faila-packagejson",
            "title": "Структура файла package.json",
            "mdPath": "/lessons/npm/struktura-faila-packagejson.md"
          },
          {
            "id": "tilda-i-karetka-v-semver",
            "title": "Тильда и каретка в версионировании Semver",
            "mdPath": "/lessons/npm/tilda-i-karetka-v-semver.md"
          },
          {
            "id": "ustanovka-konkretnyh-versii-npm-modulei",
            "title": "Установка конкретных версий npm модулей",
            "mdPath": "/lessons/npm/ustanovka-konkretnyh-versii-npm-modulei.md"
          },
          {
            "id": "packagejson-i-package-lockjson",
            "title": "package.json и package-lock.json",
            "mdPath": "/lessons/npm/packagejson-i-package-lockjson.md"
          },
          {
            "id": "peer-dependencies-v-packagejson",
            "title": "Peer dependencies в package.json",
            "mdPath": "/lessons/npm/peer-dependencies-v-packagejson.md"
          }
        ]
      },
      {
        "id": "sborka-bundle",
        "title": "Сборка bundle",
        "lessons": [
          {
            "id": "vliyanie-minifikacii-na-proizvoditelnost",
            "title": "Влияние минификации на производительность",
            "mdPath": "/lessons/sborka-bundle/vliyanie-minifikacii-na-proizvoditelnost.md"
          },
          {
            "id": "instrumenty-minifikacii-javascript",
            "title": "Инструменты минификации JavaScript",
            "mdPath": "/lessons/sborka-bundle/instrumenty-minifikacii-javascript.md"
          },
          {
            "id": "kak-rabotaet-webpack",
            "title": "Как работает Webpack?",
            "mdPath": "/lessons/sborka-bundle/kak-rabotaet-webpack.md"
          },
          {
            "id": "minimizaciya-i-optimizaciya-bandlov",
            "title": "Минимизация и оптимизация бандлов",
            "mdPath": "/lessons/sborka-bundle/minimizaciya-i-optimizaciya-bandlov.md"
          },
          {
            "id": "minifikaciya-vs-obfuskaciya",
            "title": "Минификация vs Обфускация",
            "mdPath": "/lessons/sborka-bundle/minifikaciya-vs-obfuskaciya.md"
          },
          {
            "id": "nastroika-bandlinga-dlya-development-i-production",
            "title": "Настройка бандлинга для development и production",
            "mdPath": "/lessons/sborka-bundle/nastroika-bandlinga-dlya-development-i-production.md"
          },
          {
            "id": "sravnenie-sborschikov-webpack-rollup-parcel-vite",
            "title": "Сравнение сборщиков: Webpack, Rollup, Parcel, Vite (и esbuild)",
            "mdPath": "/lessons/sborka-bundle/sravnenie-sborschikov-webpack-rollup-parcel-vite.md"
          },
          {
            "id": "chto-takoe-bandling-v-javascript",
            "title": "Что такое бандлинг в JavaScript?",
            "mdPath": "/lessons/sborka-bundle/chto-takoe-bandling-v-javascript.md"
          },
          {
            "id": "chto-takoe-kod-splitting",
            "title": "Что такое код-сплиттинг (Code Splitting)?",
            "mdPath": "/lessons/sborka-bundle/chto-takoe-kod-splitting.md"
          },
          {
            "id": "chto-takoe-modulnost",
            "title": "Что такое модульность?",
            "mdPath": "/lessons/sborka-bundle/chto-takoe-modulnost.md"
          },
          {
            "id": "vvedenie",
            "title": "Что такое сборка bundle?",
            "mdPath": "/lessons/sborka-bundle/vvedenie.md"
          },
          {
            "id": "chto-takoe-hmr-hot-module-replacement",
            "title": "Что такое HMR (Hot Module Replacement)?",
            "mdPath": "/lessons/sborka-bundle/chto-takoe-hmr-hot-module-replacement.md"
          },
          {
            "id": "chto-takoe-source-maps",
            "title": "Что такое Source Maps?",
            "mdPath": "/lessons/sborka-bundle/chto-takoe-source-maps.md"
          },
          {
            "id": "chto-takoe-tree-shaking",
            "title": "Что такое Tree Shaking?",
            "mdPath": "/lessons/sborka-bundle/chto-takoe-tree-shaking.md"
          }
        ]
      },
      {
        "id": "react",
        "title": "React",
        "lessons": [
          {
            "id": "zhiznennyi-cikl-komponentov",
            "title": "Жизненный цикл компонентов React",
            "mdPath": "/lessons/react/zhiznennyi-cikl-komponentov.md"
          },
          {
            "id": "optimizaciya-proizvoditelnosti-react",
            "title": "Оптимизация производительности React",
            "mdPath": "/lessons/react/optimizaciya-proizvoditelnosti-react.md"
          },
          {
            "id": "peredacha-dannyh-mezhdu-komponentami",
            "title": "Передача данных между компонентами в React",
            "mdPath": "/lessons/react/peredacha-dannyh-mezhdu-komponentami.md"
          },
          {
            "id": "polzovatelskie-huki-custom-hooks",
            "title": "Пользовательские хуки (Custom Hooks)",
            "mdPath": "/lessons/react/polzovatelskie-huki-custom-hooks.md"
          },
          {
            "id": "preimuschestva-react",
            "title": "Преимущества React",
            "mdPath": "/lessons/react/preimuschestva-react.md"
          },
          {
            "id": "smena-key-razmontirovanie-i-zhiznennyi-cikl",
            "title": "Смена `key`: размонтирование и жизненный цикл",
            "mdPath": "/lessons/react/smena-key-razmontirovanie-i-zhiznennyi-cikl.md"
          },
          {
            "id": "sostoyanie-v-react",
            "title": "Состояние в React",
            "mdPath": "/lessons/react/sostoyanie-v-react.md"
          },
          {
            "id": "funkcionalnye-i-klassovye-komponenty",
            "title": "Функциональные и классовые компоненты",
            "mdPath": "/lessons/react/funkcionalnye-i-klassovye-komponenty.md"
          },
          {
            "id": "vvedenie-v-react",
            "title": "Что такое React?",
            "mdPath": "/lessons/react/vvedenie-v-react.md"
          },
          {
            "id": "context-api",
            "title": "Context API в React",
            "mdPath": "/lessons/react/context-api.md"
          },
          {
            "id": "props-v-react",
            "title": "Props в React",
            "mdPath": "/lessons/react/props-v-react.md"
          },
          {
            "id": "react-fragments",
            "title": "React Fragments",
            "mdPath": "/lessons/react/react-fragments.md"
          },
          {
            "id": "usecallback-huk",
            "title": "useCallback хук",
            "mdPath": "/lessons/react/usecallback-huk.md"
          },
          {
            "id": "useeffect-huk",
            "title": "useEffect хук",
            "mdPath": "/lessons/react/useeffect-huk.md"
          },
          {
            "id": "useimperativehandle-i-usedebugvalue",
            "title": "useImperativeHandle и useDebugValue",
            "mdPath": "/lessons/react/useimperativehandle-i-usedebugvalue.md"
          },
          {
            "id": "uselayouteffect-huk",
            "title": "useLayoutEffect хук",
            "mdPath": "/lessons/react/uselayouteffect-huk.md"
          },
          {
            "id": "usememo-huk",
            "title": "useMemo хук",
            "mdPath": "/lessons/react/usememo-huk.md"
          },
          {
            "id": "useref-huk",
            "title": "useRef хук",
            "mdPath": "/lessons/react/useref-huk.md"
          },
          {
            "id": "virtual-dom",
            "title": "Virtual DOM в React",
            "mdPath": "/lessons/react/virtual-dom.md"
          }
        ]
      },
      {
        "id": "react-native",
        "title": "React Native",
        "lessons": [
          {
            "id": "vvedenie",
            "title": "Введение в React Native",
            "mdPath": "/lessons/react-native/vvedenie.md"
          },
          {
            "id": "ispolzovanie-storonnih-bibliotek-v-react-native",
            "title": "Использование сторонних библиотек в React Native",
            "mdPath": "/lessons/react-native/ispolzovanie-storonnih-bibliotek-v-react-native.md"
          },
          {
            "id": "most-react-native-bridge",
            "title": "Мост React Native (Bridge): как устроен и зачем нужен",
            "mdPath": "/lessons/react-native/most-react-native-bridge.md"
          },
          {
            "id": "obrabotka-razlichii-mezhdu-ios-i-android",
            "title": "Обработка различий между iOS и Android в React Native",
            "mdPath": "/lessons/react-native/obrabotka-razlichii-mezhdu-ios-i-android.md"
          },
          {
            "id": "preimuschestva-react-native",
            "title": "Преимущества React Native: сравнение с нативной разработкой",
            "mdPath": "/lessons/react-native/preimuschestva-react-native.md"
          },
          {
            "id": "stilizaciya-komponentov-v-react-native",
            "title": "Стилизация компонентов в React Native",
            "mdPath": "/lessons/react-native/stilizaciya-komponentov-v-react-native.md"
          },
          {
            "id": "upravlenie-sostoyaniem-v-react-native",
            "title": "Управление состоянием в React Native",
            "mdPath": "/lessons/react-native/upravlenie-sostoyaniem-v-react-native.md"
          },
          {
            "id": "shodstva-i-razlichiya-react-native-i-reactjs",
            "title": "React Native и React.js: сходства и различия",
            "mdPath": "/lessons/react-native/shodstva-i-razlichiya-react-native-i-reactjs.md"
          }
        ]
      },
      {
        "id": "nodejs",
        "title": "Node.js",
        "lessons": [
          {
            "id": "bezopasnost-v-nodejs",
            "title": "Безопасность в Node.js",
            "mdPath": "/lessons/nodejs/bezopasnost-v-nodejs.md"
          },
          {
            "id": "bufery-buffers-v-nodejs",
            "title": "Буферы (Buffers) в Node.js",
            "mdPath": "/lessons/nodejs/bufery-buffers-v-nodejs.md"
          },
          {
            "id": "asinhronnost-v-nodejs-kak-rabotaet-plyusy-i-minusy",
            "title": "Как Node.js обрабатывает асинхронные операции: модель, плюсы и минусы",
            "mdPath": "/lessons/nodejs/asinhronnost-v-nodejs-kak-rabotaet-plyusy-i-minusy.md"
          },
          {
            "id": "modul-http-v-nodejs",
            "title": "Модуль HTTP в Node.js",
            "mdPath": "/lessons/nodejs/modul-http-v-nodejs.md"
          },
          {
            "id": "opredelenie-sredy-vypolneniya-v-nodejs",
            "title": "Определение среды выполнения в Node.js",
            "mdPath": "/lessons/nodejs/opredelenie-sredy-vypolneniya-v-nodejs.md"
          },
          {
            "id": "osobennosti-i-otlichiya-nodejs-ot-php-i-java",
            "title": "Особенности Node.js и отличия от PHP/Java",
            "mdPath": "/lessons/nodejs/osobennosti-i-otlichiya-nodejs-ot-php-i-java.md"
          },
          {
            "id": "potoki-streams-v-nodejs",
            "title": "Потоки (Streams) в Node.js",
            "mdPath": "/lessons/nodejs/potoki-streams-v-nodejs.md"
          },
          {
            "id": "sobytiino-orientirovannoe-programmirovanie-v-nodejs",
            "title": "Событийно‑ориентированное программирование в Node.js",
            "mdPath": "/lessons/nodejs/sobytiino-orientirovannoe-programmirovanie-v-nodejs.md"
          },
          {
            "id": "upravlenie-processami-v-nodejs",
            "title": "Управление процессами в Node.js",
            "mdPath": "/lessons/nodejs/upravlenie-processami-v-nodejs.md"
          },
          {
            "id": "vvedenie-v-nodejs",
            "title": "Что такое Node.js?",
            "mdPath": "/lessons/nodejs/vvedenie-v-nodejs.md"
          },
          {
            "id": "event-loop-v-nodejs",
            "title": "Event Loop в Node.js",
            "mdPath": "/lessons/nodejs/event-loop-v-nodejs.md"
          },
          {
            "id": "middleware-v-nodejs",
            "title": "Middleware в Node.js",
            "mdPath": "/lessons/nodejs/middleware-v-nodejs.md"
          },
          {
            "id": "restful-api-s-expressjs",
            "title": "RESTful API с Express.js",
            "mdPath": "/lessons/nodejs/restful-api-s-expressjs.md"
          }
        ]
      },
      {
        "id": "typescript",
        "title": "TypeScript",
        "lessons": [
          {
            "id": "vvedenie",
            "title": "Введение в TypeScript",
            "mdPath": "/lessons/typescript/vvedenie.md"
          },
          {
            "id": "dzheneriki-v-typescript",
            "title": "Дженерики в TypeScript",
            "mdPath": "/lessons/typescript/dzheneriki-v-typescript.md"
          },
          {
            "id": "nasledovanie-i-abstraktnye-klassy-v-typescript",
            "title": "Наследование и абстрактные классы в TypeScript",
            "mdPath": "/lessons/typescript/nasledovanie-i-abstraktnye-klassy-v-typescript.md"
          },
          {
            "id": "otladka-koda-v-typescript",
            "title": "Отладка кода в TypeScript",
            "mdPath": "/lessons/typescript/otladka-koda-v-typescript.md"
          },
          {
            "id": "tipy-i-funkcii-upravleniya-zavisimostyami",
            "title": "Типы и функции управления зависимостями в TypeScript",
            "mdPath": "/lessons/typescript/tipy-i-funkcii-upravleniya-zavisimostyami.md"
          },
          {
            "id": "chto-takoe-typescript-i-ego-preimuschestva",
            "title": "Что такое TypeScript и его преимущества",
            "mdPath": "/lessons/typescript/chto-takoe-typescript-i-ego-preimuschestva.md"
          },
          {
            "id": "interface-i-type-v-typescript",
            "title": "Interface vs type в TypeScript",
            "mdPath": "/lessons/typescript/interface-i-type-v-typescript.md"
          },
          {
            "id": "union-i-intersection-tipy-v-typescript",
            "title": "Union и Intersection типы в TypeScript",
            "mdPath": "/lessons/typescript/union-i-intersection-tipy-v-typescript.md"
          }
        ]
      },
      {
        "id": "accessibility",
        "title": "Accessibility",
        "lessons": [
          {
            "id": "dinamicheskie-obyavleniya-aria-live-i-aria-atomic",
            "title": "Динамические объявления: aria-live и aria-atomic",
            "mdPath": "/lessons/accessibility/dinamicheskie-obyavleniya-aria-live-i-aria-atomic.md"
          },
          {
            "id": "estestvenno-fokusiruemye-elementy-kto-poluchaet-fokus-vsegda",
            "title": "Естественно фокусируемые элементы: кто получает фокус всегда",
            "mdPath": "/lessons/accessibility/estestvenno-fokusiruemye-elementy-kto-poluchaet-fokus-vsegda.md"
          },
          {
            "id": "indikatory-fokusa-pochemu-odnogo-cveta-ramki-nedostatochno",
            "title": "Индикаторы фокуса: почему одного цвета рамки недостаточно",
            "mdPath": "/lessons/accessibility/indikatory-fokusa-pochemu-odnogo-cveta-ramki-nedostatochno.md"
          },
          {
            "id": "custom-elements-kombinirovanie-s-html",
            "title": "Комбинирование стандартных HTML‑тегов и Custom Elements (Web Components)",
            "mdPath": "/lessons/accessibility/custom-elements-kombinirovanie-s-html.md"
          },
          {
            "id": "opasnosti-sbrosa-focus-pochemu-outline-none-vredit-dostupnosti",
            "title": "Опасности сброса :focus — почему outline: none вредит доступности",
            "mdPath": "/lessons/accessibility/opasnosti-sbrosa-focus-pochemu-outline-none-vredit-dostupnosti.md"
          },
          {
            "id": "personalizaciya-skrinriderov-nastroiki-pod-polzovatelya",
            "title": "Персонализация скринридеров: настройки под пользователя",
            "mdPath": "/lessons/accessibility/personalizaciya-skrinriderov-nastroiki-pod-polzovatelya.md"
          },
          {
            "id": "button-vs-a-dostupnost-i-ux",
            "title": "Разница между `<button>` и `<a>` в A11Y и связь с UX",
            "mdPath": "/lessons/accessibility/button-vs-a-dostupnost-i-ux.md"
          },
          {
            "id": "roli-role-v-a11y-populyarnye-znacheniya-i-pravila",
            "title": "Роли (role) в A11Y: популярные значения и правила",
            "mdPath": "/lessons/accessibility/roli-role-v-a11y-populyarnye-znacheniya-i-pravila.md"
          },
          {
            "id": "semantika-html-vs-aria-kogda-chto-vybirat",
            "title": "Семантика HTML vs ARIA: когда что выбирать",
            "mdPath": "/lessons/accessibility/semantika-html-vs-aria-kogda-chto-vybirat.md"
          },
          {
            "id": "skrinridery-i-sovmestimost-nvda-jaws-voiceover-os-i-brauzery",
            "title": "Скринридеры и совместимость: NVDA, JAWS, VoiceOver + ОС и браузеры",
            "mdPath": "/lessons/accessibility/skrinridery-i-sovmestimost-nvda-jaws-voiceover-os-i-brauzery.md"
          },
          {
            "id": "skrytie-ot-at-aria-hiddentrue-i-ego-opasnosti",
            "title": "Скрытие от AT: aria-hidden=\"true\" и его опасности",
            "mdPath": "/lessons/accessibility/skrytie-ot-at-aria-hiddentrue-i-ego-opasnosti.md"
          },
          {
            "id": "skrytye-elementy-i-dostupnost-hidden-aria-hidden-sr-only",
            "title": "Скрытые элементы и доступность (hidden, aria-hidden, sr-only)",
            "mdPath": "/lessons/accessibility/skrytye-elementy-i-dostupnost-hidden-aria-hidden-sr-only.md"
          },
          {
            "id": "sposoby-navigacii-v-html-dlya-skrinriderov",
            "title": "Способы навигации в HTML для скринридеров",
            "mdPath": "/lessons/accessibility/sposoby-navigacii-v-html-dlya-skrinriderov.md"
          },
          {
            "id": "stili-fokusa-focus-vs-focus-visible",
            "title": "Стили фокуса: :focus vs :focus-visible",
            "mdPath": "/lessons/accessibility/stili-fokusa-focus-vs-focus-visible.md"
          },
          {
            "id": "ubiraem-semantiku-rolepresentation-i-rolenone",
            "title": "Убираем семантику: role=\"presentation\" и role=\"none\"",
            "mdPath": "/lessons/accessibility/ubiraem-semantiku-rolepresentation-i-rolenone.md"
          },
          {
            "id": "upravlenie-fokusom-kogda-nuzhen-tabindex",
            "title": "Управление фокусом: когда нужен tabindex",
            "mdPath": "/lessons/accessibility/upravlenie-fokusom-kogda-nuzhen-tabindex.md"
          },
          {
            "id": "vvedenie",
            "title": "Что такое стандартная семантика HTML для screenreader?",
            "mdPath": "/lessons/accessibility/vvedenie.md"
          },
          {
            "id": "vvedenie-3",
            "title": "Что такое табуляция и подсветка фокуса?",
            "mdPath": "/lessons/accessibility/vvedenie-3.md"
          },
          {
            "id": "vvedenie-4",
            "title": "Что такое экранные читалки (screenreaders)?",
            "mdPath": "/lessons/accessibility/vvedenie-4.md"
          },
          {
            "id": "vvedenie-2",
            "title": "Что такое id, role и aria-* атрибуты?",
            "mdPath": "/lessons/accessibility/vvedenie-2.md"
          },
          {
            "id": "aria-i-neskolko-id-aria-labelledby-aria-describedby",
            "title": "ARIA и несколько ID: aria-labelledby, aria-describedby",
            "mdPath": "/lessons/accessibility/aria-i-neskolko-id-aria-labelledby-aria-describedby.md"
          },
          {
            "id": "aria-svoistva-properties-vs-sostoyaniya-states",
            "title": "ARIA: свойства (properties) vs состояния (states)",
            "mdPath": "/lessons/accessibility/aria-svoistva-properties-vs-sostoyaniya-states.md"
          },
          {
            "id": "hotkeys-skrinriderov-upravlenie-fokusom-i-navigaciya",
            "title": "Hotkeys скринридеров: управление фокусом и навигация",
            "mdPath": "/lessons/accessibility/hotkeys-skrinriderov-upravlenie-fokusom-i-navigaciya.md"
          },
          {
            "id": "screen-reader-chto-mozhno-kontrolirovat-cherez-role-i-aria",
            "title": "Screen Reader: что можно контролировать через role и aria-*",
            "mdPath": "/lessons/accessibility/screen-reader-chto-mozhno-kontrolirovat-cherez-role-i-aria.md"
          },
          {
            "id": "tabindex-1-programmnyi-fokus-bez-uchastiya-v-tab-navigacii",
            "title": "tabindex=\"-1\": программный фокус без участия в Tab‑навигации",
            "mdPath": "/lessons/accessibility/tabindex-1-programmnyi-fokus-bez-uchastiya-v-tab-navigacii.md"
          },
          {
            "id": "ux-standartnyh-htmltegov-vs-role-i-aria",
            "title": "UX стандартных HTML‑тегов vs role/aria",
            "mdPath": "/lessons/accessibility/ux-standartnyh-htmltegov-vs-role-i-aria.md"
          }
        ]
      }
    ]
  };
  
  export function findLesson(moduleId?: string, lessonId?: string) {
    if (!moduleId) return manifest.modules[0].lessons[0];
    const mod = manifest.modules.find((m) => m.id === moduleId) || manifest.modules[0];
    if (!lessonId) return mod.lessons[0];
    return mod.lessons.find((l) => l.id === lessonId) || mod.lessons[0];
  }
  