/* ==========================================================================
   BASE DE DATOS COMPLETA DE LAS 28 OBRAS — CELONOR
   ========================================================================== */
const CATEGORY_THEMES = {
  miniseries: { label: "MINISERIES", code: "MS", color: "#c1ccd7" },
  series: { label: "SERIES", code: "SR", color: "#849687" },
  cortos: { label: "SHORT FILMS", code: "SF", color: "#b597a3" },
  peliculas: { label: "MOVIES", code: "MV", color: "#e67e51" }
};

const OBRAS_DATA = [
  // CATEGORÍA 1: MINISERIES
  {
    id: "miniseries_1", slug: "cyberpunk-edgerunners", category: "miniseries", number: 1, title: "Cyberpunk: Edgerunners", year: "2022",
    credits: [
      { label: "Direction", value: "Hiroyuki Imaishi (Studio Trigger)." },
      { label: "Screenplay & Prod", value: "Masahiko Otsuka, Yoshiki Usa, CD Projekt Red." },
      { label: "Music", value: "Akira Yamaoka, Franz Ferdinand." }
    ],
    origen: "El proyecto nació formalmente en 2018 como una colaboración internacional entre el estudio polaco CD Projekt Red y el estudio japonés Studio Trigger, mucho antes del accidentado lanzamiento del videojuego Cyberpunk 2077. CD Projekt Red buscaba expandir el universo de Night City a través de una mirada netamente autoral en anime. Trigger aceptó bajo la condición de tener total libertad creativa en la dirección artística.",
    proceso: "El choque creativo inicial fue notorio: CD Projekt Red quería un tono más sobrio y realista, mientras que Imaishi e Hiroyuki Kaneko apostaron por el maximalismo visual característico de obras como Kill la Kill o Gurren Lagann, lleno de colores flúor saturados, gore desmedido y dinamismo cinético. Hubo debates intensos sobre el diseño de personajes (especialmente Rebecca, a quien los productores polacos casi descartan por considerarla fuera de tono, pero que Trigger defendió a rajatabla). Tras su estreno en septiembre de 2022 en Netflix, la miniserie revitalizó por completo el interés mundial en la franquicia y ganó el premio a Anime del Año en los Crunchyroll Anime Awards."
  },
  {
    id: "miniseries_2", slug: "odd-taxi", category: "miniseries", number: 2, title: "Odd Taxi", year: "2021",
    credits: [
      { label: "Direction", value: "Baku Kinoshita." },
      { label: "Screenplay", value: "Kazuya Konomoto." },
      { label: "Studio", value: "OLM y P.I.C.S." },
      { label: "Music", value: "OMSB, PUNPEE, VaVa." }
    ],
    origen: "Odd Taxi fue concebida fuera de las fórmulas tradicionales de la industria. Kazuya Konomoto, conocido por su manga SetoUtsumi, escribió los 13 episodios con una estructura narrativa coral inspirada en directores de cine como Quentin Tarantino y los hermanos Coen. El concepto central nació de un chofer de taxi apático y cínico, Odokawa, escuchando fragmentos de vida de sus pasajeros en Tokio.",
    proceso: "La decisión de usar animales antropomórficos no fue un recurso infantil, sino un dispositivo narrativo psicológico directamente ligado a la condición mental del protagonista. Las sesiones de grabación se hicieron de forma poco convencional: en lugar de grabar a los actores por separado como es habitual, juntaron a los comediantes del circuito Manzai (la productora Yoshimoto Kogyo prestó muchas de las voces) para improvisar pausas, solapamientos y silencios incómodos. Se estrenó en primavera de 2021 de forma silenciosa, convirtiéndose de inmediato en un fenómeno de culto por su guion redondo y la precisión de sus giros."
  },
  {
    id: "miniseries_3", slug: "keep-your-hands-off-eizouken", category: "miniseries", number: 3, title: "Keep Your Hands Off Eizouken!", year: "2020",
    credits: [
      { label: "Direction", value: "Masaaki Yuasa (Science SARU)." },
      { label: "Original Work", value: "Manga by Sumito Ōwara." },
      { label: "Music", value: "Oorutaichi." }
    ],
    origen: "Adaptación directa del manga serializado en la revista Monthly Spirits desde 2016. Masaaki Yuasa, fascinado por la forma en que el cómic retrataba la pasión bruta por el dibujo y la arquitectura fantástica, tomó el proyecto como una carta de amor a los artesanos de la animación y al proceso creativo colaborativo.",
    proceso: "El equipo de Science SARU dividió visualmente la serie en dos capas: el mundo real, estructurado sobre una escuela laberíntica inspirada en la arquitectura brutalista y costera japonesa, y el \"mundo de la imaginación\", donde los dibujos de las tres protagonistas (Midori, Sayaka y Tsubame) cobraban vida con trazos sueltos de acuarela, efectos de sonido onomatopéyicos hechos con la boca y bosquejos en movimiento. Fue una de las producciones más aclamadas de 2020, destacada por The New York Times como una de las mejores series internacionales del año."
  },
  {
    id: "miniseries_4", slug: "bocchi-the-rock", category: "miniseries", number: 4, title: "Bocchi the Rock!", year: "2022",
    credits: [
      { label: "Direction", value: "Keiichirō Saitō (CloverWorks)." },
      { label: "Original Work", value: "4-koma Manga by Aki Hamaji." },
      { label: "Char. Design", value: "Kerorira." }
    ],
    origen: "Basada en una tira cómica sencilla de cuatro viñetas sobre chicas de secundaria formando una banda de rock. El proyecto pasó de ser una producción de bajo perfil a convertirse en un hito visual gracias al empeño personal del animador Kerorira, quien insistió ante CloverWorks para liderar el proyecto y reclutó a jóvenes talentos de la escena digital independiente (webgen animators).",
    proceso: "La serie destacó por su audacia para traducir la ansiedad social extrema de Hitori Gotō en recursos audiovisuales inclasificables: secuencias de animación en plastilina (claymation), maquetas de cartón en acción real, renders tridimensionales con físicas rotas de PlayStation 1, pixilación y cambios abruptos de estilo de dibujo. Además, la producción musical grabó los instrumentos de la banda ficticia Kessoku Band con técnicas de microfonía analógica y errores intencionales para reflejar el nivel real de músicos principiantes."
  },
  {
    id: "miniseries_5", slug: "the-tatami-time-machine-blues", category: "miniseries", number: 5, title: "The Tatami Time Machine Blues", year: "2022",
    credits: [
      { label: "Direction", value: "Shingo Natsume (Science SARU)." },
      { label: "Screenplay", value: "Makoto Ueda." },
      { label: "Original Work", value: "Novel by Tomihiko Morimi." }
    ],
    origen: "Secuela espiritual de la icónica serie de culto The Tatami Galaxy (2010). Surgió a partir del cruce entre el universo literario de Tomihiko Morimi y la célebre obra de teatro de viajes en el tiempo Summer Time Machine Blues de Makoto Ueda. Masaaki Yuasa, quien dirigió la original, le cedió la silla de director a Shingo Natsume (Sonny Boy, One Punch Man).",
    proceso: "La miniserie de 6 episodios conservó la velocidad del monólogo interno acelerado del protagonista, las paletas planas de colores desaturados y la mezcla de fondos hiperrealistas con personajes caricaturescos diseñados originalmente por Yusuke Nakamura. La historia gira en torno a una premisa ridícula: viajar al pasado un solo día para evitar que el control remoto del aire acondicionado se rompa con una gaseosa derramada. La producción se estrenó como miniserie en Disney+ y como película en salas de cine selectas de Japón en 2022."
  },
  {
    id: "miniseries_6", slug: "pluto", category: "miniseries", number: 6, title: "Pluto", year: "2023",
    credits: [
      { label: "Studio", value: "Studio M2 (Masao Maruyama)." },
      { label: "Original Work", value: "Manga by Naoki Urasawa & Takashi Nagasaki." },
      { label: "Supervision", value: "Macoto Tezka." }
    ],
    origen: "La adaptación animada de Pluto tuvo un período de gestación de más de una década. Anunciada formalmente en 2017 por Masao Maruyama (cofundador legendario de Madhouse y MAPPA), el proyecto requirió años de negociación y preproducción para asegurar que la crudeza psicológica y el tono noir de Naoki Urasawa no sufrieran concesiones comerciales.",
    proceso: "Producida finalmente como una serie de 8 episodios de una hora completa cada uno (equivalente al volumen de una temporada entera por cada capítulo), Studio M2 trabajó con un estándar de animación cinemática. Se evitó el estilo estilizado moderno para respetar la estética madura de finales de los noventa e inicios de los 2000, integrando dilemas éticos sobre la inteligencia artificial, los traumas de guerra y el odio como fuerza destructiva. Netflix la estrenó a nivel global en octubre de 2023."
  },
  {
    id: "miniseries_7", slug: "devilman-crybaby", category: "miniseries", number: 7, title: "Devilman Crybaby", year: "2018",
    credits: [
      { label: "Direction", value: "Masaaki Yuasa (Science SARU)." },
      { label: "Screenplay", value: "Ichirō Ōkouchi." },
      { label: "Music", value: "Kensuke Ushio." },
      { label: "Original Work", value: "Manga by Go Nagai (1972)." }
    ],
    origen: "Con motivo del 50 aniversario de la carrera artística de Go Nagai, Aniplex y Netflix comisionaron a Masaaki Yuasa la tarea de adaptar el manga original de forma íntegra, algo que ninguna versión animada previa había logrado debido a la violencia extrema, el contenido sexual explícito y el devastador final nihilista del cómic original.",
    proceso: "Yuasa trasladó la ambientación de los años 70 al Japón contemporáneo de finales de la década de 2010, reemplazando a las pandillas de delincuentes juveniles por raperos de freestyle callejero (cuyas rimas servían como coro griego para narrar la descomposición social). La música electrónica experimental de Kensuke Ushio impulsó escenas de dinamismo hiperbólico, distorsión corporal y fluidez orgánica sin líneas de contorno rígidas. Su lanzamiento en enero de 2018 marcó un antes y un después en las producciones originales de anime para streaming."
  },

  // CATEGORÍA 2: SERIES
  {
    id: "series_1", slug: "frieren", category: "series", number: 1, title: "Frieren: Beyond Journey's End", year: "2023",
    credits: [
      { label: "Direction", value: "Keiichirō Saitō (Madhouse)." },
      { label: "Screenplay", value: "Tomohiro Suzuki." },
      { label: "Music", value: "Evan Call." },
      { label: "Original Work", value: "Manga by Kanehito Yamada & Tsukasa Abe." }
    ],
    origen: "Basada en el laureado manga serializado en la Weekly Shōnen Sunday. Tras el enorme impacto de Bocchi the Rock!, el director Keiichirō Saitō fue convocado de inmediato por el histórico estudio Madhouse para encargarse de una producción de gran escala de 28 episodios.",
    proceso: "La serie desafió las convenciones del género fantástico al centrarse en lo que ocurre después de que el Rey Demonio es derrotado, abordando la percepción del tiempo a través de los ojos de una elfa casi inmortal. El equipo de animación dedicó meses a construir un ritmo pausado, silencios contemplativos y un nivel de detalle milimétrico en ropa, cabello movido por el viento y paisajes medievales. Las coreografías de combate no recurrieron al 3D invasivo, sino a una animación tradicional en 2D ejecutada por animadores clave veteranos y jóvenes promesas de la escena global."
  },
  {
    id: "series_2", slug: "mob-psycho-100", category: "series", number: 2, title: "Mob Psycho 100", year: "2016 - 2022",
    credits: [
      { label: "Direction", value: "Yuzuru Tachikawa & Takahiro Hasui." },
      { label: "Studio", value: "BONES." },
      { label: "Char. Design", value: "Yoshimichi Kameda." },
      { label: "Original Work", value: "Webmanga by ONE." }
    ],
    origen: "Cuando el estudio BONES decidió adaptar el webmanga de ONE, asumieron el desafío de no estandarizar ni embellecer los trazos toscos del autor original, sino elevarlos a su máxima expresión expresiva a través del dibujo a mano.",
    proceso: "Liderado por Yoshimichi Kameda, el equipo implementó técnicas mixtas: animación tradicional sobre acetato y papel, pintura al óleo sobre vidrio ejecutada en tiempo real por Miyo Sato, y secuencias de acción donde el volumen y la anatomía se deformaban deliberadamente para enfatizar la explosión emocional del protagonista. La producción se extendió a lo largo de tres temporadas impecables, concluyendo la historia completa del manga sin rellenos comerciales ni caídas en el estándar de calidad."
  },
  {
    id: "series_3", slug: "vinland-saga", category: "series", number: 3, title: "Vinland Saga", year: "2019 - 2023",
    credits: [
      { label: "Direction", value: "Shūhei Yabuta." },
      { label: "Screenplay", value: "Hiroshi Seko." },
      { label: "Studio", value: "Wit Studio & MAPPA." },
      { label: "Original Work", value: "Manga by Makoto Yukimura." }
    ],
    origen: "Wit Studio adquirió los derechos del manga histórico sobre la era vikinga con la ambición de replicar el nivel de crudeza y realismo geopolítico que habían plasmado en Attack on Titan. Cuando el equipo de producción liderado por Shūhei Yabuta migró a MAPPA para la segunda temporada, el núcleo principal de animadores y directores se mantuvo intacto.",
    proceso: "La producción investigó a fondo vestimentas nórdicas, sistemas de navegación marítima del siglo XI y topografías de Inglaterra e Islandia. La transición entre la temporada 1 (marcada por sangrientas batallas, venganza y dinamismo crudo) y la temporada 2 (centrada en la redención interior, el trabajo agrícola forzado y el pacifismo de Thorfinn) fue ejecutada con una madurez inusual para el medio, priorizando la actuación de personajes a través de gestos mínimos, miradas y respiraciones."
  },
  {
    id: "series_4", slug: "delicious-in-dungeon", category: "series", number: 4, title: "Delicious in Dungeon", year: "2024",
    credits: [
      { label: "Direction", value: "Yoshihiro Miyajima (Studio Trigger)." },
      { label: "Music", value: "Yasunori Mitsuda & Shunsuke Minami." },
      { label: "Original Work", value: "Manga by Ryōko Kui." }
    ],
    origen: "Tras años de espera por parte de los lectores del manga, Studio Trigger tomó el proyecto como su primera serie semanal transmitida simultáneamente a nivel mundial durante dos trimestres consecutivos (24 episodios).",
    proceso: "La producción abordó la historia con un rigor culinario e iconográfico absoluto. Los animadores no solo estudiaron cómo dibujar monstruos fantásticos (dragones, basiliscos, plantas carnívoras), sino cómo descomponer anatómicamente su carne, cómo reaccionan las grasas y los aceites en el fuego y cómo representar el crujido y la textura de la comida. Detrás de la comedia gastronómica, el director Yoshihiro Miyajima construyó una sólida trama de ecología de mazmorras y fantasía oscura tradicional."
  },
  {
    id: "series_5", slug: "chainsaw-man", category: "series", number: 5, title: "Chainsaw Man", year: "2022",
    credits: [
      { label: "Direction", value: "Ryū Nakayama & Makoto Nakazono." },
      { label: "Studio", value: "MAPPA." },
      { label: "Screenplay", value: "Hiroshi Seko." },
      { label: "Music", value: "Kensuke Ushio." },
      { label: "Original Work", value: "Manga by Tatsuki Fujimoto." }
    ],
    origen: "El CEO de MAPPA, Manabu Otsuka, decidió financiar el proyecto al 100% de manera interna, sin un comité de producción tradicional que limitara las decisiones artísticas o impusiera censura. El director novel Ryū Nakayama fue elegido personalmente para imprimir un lenguaje puramente cinematográfico y occidental.",
    proceso: "Se impuso una regla estética clara: evitar los clichés habituales del anime shōnen tradicional (sin ojos gigantes desproporcionados, sin gritos exagerados fuera de tono y con paletas de color con iluminación naturalista). La producción contrató a doce artistas de primer nivel para componer doce canciones de cierre (endings) distintas con sus propias secuencias animadas para cada episodio. El resultado fue una obra visceral, divisiva por su frialdad visual y alabada por su audaz coreografía de acción."
  },
  {
    id: "series_6", slug: "dandadan", category: "series", number: 6, title: "Dandadan", year: "2024",
    credits: [
      { label: "Direction", value: "Fūga Yamashiro." },
      { label: "Studio", value: "Science SARU." },
      { label: "Screenplay", value: "Hiroshi Seko." },
      { label: "Music", value: "Kensuke Ushio." },
      { label: "Original Work", value: "Manga by Yukinobu Tatsu." }
    ],
    origen: "Uno de los mangas digitales más exitosos de la plataforma Shōnen Jump+ fue confiado a Science SARU bajo el liderazgo del joven director Fūga Yamashiro, quien debutaba al frente de una producción masiva tras haber sido asistente de dirección en Inu-Oh y The Tatami Time Machine Blues.",
    proceso: "El anime combinó el folclore japonés de fantasmas urbanos (Yokai) con teorías conspirativas sobre extraterrestres y comedia romántica juvenil. La animación se caracterizó por un ritmo cinético vertiginoso, deformación elástica de cuerpos, perspectivas extremas con lentes ojo de pez y una paleta de color pop psicodélica impulsada por las bases electrónicas de Kensuke Ushio. Logró equilibrar el absurdo grotesco con una ternura emocional muy cuidada en sus personajes principales."
  },
  {
    id: "series_7", slug: "the-apothecary-diaries", category: "series", number: 7, title: "The Apothecary Diaries", year: "2023 - 2024",
    credits: [
      { label: "Direction", value: "Norihiko Naganuma." },
      { label: "Studio", value: "OLM & TOHO Animation STUDIO." },
      { label: "Original Work", value: "Light Novel by Natsu Hyūga." },
      { label: "Char. Design", value: "Yukiko Nakatani." }
    ],
    origen: "Basada en la exitosa serie de novelas ambientadas en un palacio imperial ficticio de inspiración china. Producida por la alianza entre OLM y TOHO Animation para llenar el espacio de dramas de época detectivescos.",
    proceso: "El proyecto se apoyó en una minuciosa investigación histórica y botánica. Cada hierba medicinal, veneno, pigmento cosmético y plato servido a la realeza fue documentado con precisión. La dirección de arte recreó la arquitectura palaciega con interiores de celosías intrincadas, juegos de luz natural entre sedas y una dirección de fotografía sofisticada. La interpretación de Maomao como una investigadora brillante, pragmática y desprovista de interés por el romance tradicional la convirtió en una de las producciones más aclamadas y vistas del período."
  },

  // CATEGORÍA 3: CORTOS Y FORMATOS MEDIOS
  {
    id: "cortos_1", slug: "star-wars-visions", category: "cortos", number: 1, title: "Star Wars: Visions", year: "2021",
    credits: [
      { label: "Exec. Producer", value: "Lucasfilm (Jacqui Lopez, James Waugh)." },
      { label: "Studios", value: "Kamikaze Douga, Geno Studio, Studio Colorido, Trigger, Kinema Citrus, Science SARU, Production I.G." }
    ],
    origen: "Antología de cortometrajes impulsada por Lucasfilm, donde se les dio a siete de los estudios de animación japoneses más influyentes libertad total para reinterpretar la mitología de Star Wars sin la atadura del canon oficial.",
    proceso: "Cada cortometraje exploró una visión estética única: Kamikaze Douga aplicó sombreado plano (cel-shading) imitando el teatro Noh y el cine de Akira Kurosawa en The Duel; Studio Trigger volcó su maximalismo de sables de luz multicolor en The Twins y The Elder; mientras que Science SARU experimentó con acuarelas y animación infantil en T0-B1 y pinceladas tradicionales en Akakiri. El proyecto demostró el potencial universal de Star Wars al ser filtrado por la sensibilidad plástica del anime."
  },
  {
    id: "cortos_2", slug: "pokemon-twilight-wings", category: "cortos", number: 2, title: "Pokémon: Twilight Wings", year: "2020",
    credits: [
      { label: "Direction", value: "Shingo Yamashita." },
      { label: "Studio", value: "Studio Colorido." },
      { label: "Screenplay", value: "Sou Kinoshita." }
    ],
    origen: "Miniserie web de 7 episodios cortos comisionada por The Pokémon Company para promocionar la región de Galar de los videojuegos Pokémon Sword & Shield. Shingo Yamashita, pionero de la animación digital en Japón, tomó las riendas del proyecto.",
    proceso: "Lejos de centrarse en batallas masivas o en el viaje de un héroe infantil tradicional, Yamashita retrató la cotidianidad de los habitantes de Galar: un niño hospitalizado que sueña con ver a su ídolo, una líder de gimnasio en crisis de confianza o la rutina solitaria de un taxi volador de Corviknight. La cinematografía se distinguió por una iluminación atmosférica, sombras suaves, pintura digital con textura y un tratamiento empático del universo Pokémon nunca antes visto en pantalla."
  },
  {
    id: "cortos_3", slug: "gotcha", category: "cortos", number: 3, title: "Gotcha!", year: "2020",
    credits: [
      { label: "Direction", value: "Rie Matsumoto." },
      { label: "Studio", value: "BONES." },
      { label: "Main Theme", value: "\"Acacia\" by BUMP OF CHICKEN." },
      { label: "Anim. Direction", value: "Yuki Hayashi." }
    ],
    origen: "Video musical animado de tres minutos y medio comisionado por The Pokémon Company para conmemorar el lanzamiento de las expansiones de la octava generación. Rie Matsumoto y Yuki Hayashi formaron equipo nuevamente en BONES para crear una cápsula visual de alto impacto.",
    proceso: "Condensa 25 años de historia de la franquicia en una catarata ininterrumpida de información visual: cada cuadro contiene referencias exactas a entrenadores, líderes de gimnasio, campeones y criaturas desde Kanto hasta Galar. La animación se ejecutó con un ritmo musical frenético, cortes de plano cada pocas milésimas de segundo, líneas de tinta expresivas y una composición de planos calculada para ser descompuesta cuadro por cuadro por la comunidad de fans."
  },
  {
    id: "cortos_4", slug: "scott-pilgrim-takes-off", category: "cortos", number: 4, title: "Scott Pilgrim Takes Off", year: "2023",
    credits: [
      { label: "Direction", value: "Abel Góngora (Science SARU)." },
      { label: "Creators & Writers", value: "Bryan Lee O'Malley & BenDavid Grabinski." },
      { label: "Exec. Producer", value: "Edgar Wright." },
      { label: "Music", value: "Anamanaguchi & Joseph Trapanese." }
    ],
    origen: "Inicialmente anunciada como una adaptación animada tradicional de las novelas gráficas de culto de Bryan Lee O'Malley, la producción operó en secreto como una subversión total de la historia: Scott Pilgrim es derrotado en el primer episodio, convirtiendo la trama en un viaje de descubrimiento centrado en Ramona Flowers y sus siete ex malvados.",
    proceso: "El estudio japonés Science SARU, bajo la dirección del animador español Abel Góngora, trabajó combinando animación tradicional en Flash/Animate con fondos hechos a mano para capturar la línea limpia del cómic original. El elenco completo de la película de 2010 (Michael Cera, Mary Elizabeth Winstead, Chris Evans, Brie Larson, etc.) regresó para prestar sus voces originales, logrando un híbrido transatlántico único entre la cultura pop canadiense, Hollywood y el craft de animación de Tokio."
  },
  {
    id: "cortos_5", slug: "look-back-short", category: "cortos", number: 5, title: "Look Back (Short Cut)", year: "2024",
    credits: [
      { label: "Direction, Screenplay & Char. Design", value: "Kiyotaka Oshiyama (Studio Durian)." },
      { label: "Original Work", value: "One-shot by Tatsuki Fujimoto." },
      { label: "Music", value: "Haruka Nakamura." }
    ],
    origen: "Kiyotaka Oshiyama, una de las figuras más respetadas del dibujo a mano en Japón (animador clave en The Wind Rises de Ghibli y Space Dandy), fundó el pequeño Studio Durian y asumió la titánica tarea de adaptar el cómic autobiográfico de Fujimoto de 140 páginas prácticamente en solitario.",
    proceso: "Con una duración compacta de 58 minutos, la obra prescindió de los filtros de pulido de los grandes estudios comerciales: los trazos de lápiz originales de los bocetos de animación (genga) se mantuvieron visibles en el render final sin líneas vectoriales perfectas. Oshiyama dibujó o corrigió personalmente la inmensa mayoría de los fotogramas del film. El resultado es un testimonio conmovedor sobre la obsesión por dibujar, la soledad creativa y el duelo, aclamado unánmente en festivales internacionales como Annecy."
  },
  {
    id: "cortos_6", slug: "eve-bokurano", category: "cortos", number: 6, title: "Eve: Bokurano", year: "2023",
    credits: [
      { label: "Direction", value: "Waboku." },
      { label: "Artist / Musician", value: "Eve." },
      { label: "Animation", value: "Eve's independent studio and collaborating illustrators." }
    ],
    origen: "Proyecto audiovisual musical creado específicamente para la pista \"Bokurano\" del cantante y compositor japonés Eve, en colaboración con el renombrado director independiente y animador experimental Waboku.",
    proceso: "El cortometraje musical profundiza en la estética de la desolación urbana, la arquitectura surrealista y las criaturas metafóricas que pueblan el universo visual de Eve. Con una paleta dominada por grises de concreto, celestes y destellos de neón, la pieza destaca por sus coreografías de combate sinuoso, metamorfosis de objetos en criaturas mecánicas y un tratamiento de la silueta que prescinde de detalles realistas para potenciar el lirismo de la canción."
  },
  {
    id: "cortos_7", slug: "shelter", category: "cortos", number: 7, title: "Shelter", year: "2016",
    credits: [
      { label: "Screenplay & Music", value: "Porter Robinson & Madeon." },
      { label: "Direction", value: "Toshifumi Akai." },
      { label: "Studio", value: "A-1 Pictures." },
      { label: "Char. Design", value: "Megumi Kouno." }
    ],
    origen: "El productor estadounidense de música electrónica Porter Robinson escribió un guion de seis minutos sobre una joven atrapada sola en una simulación de realidad virtual flotando por el espacio. Robinson viajó a Tokio para presentar la idea a A-1 Pictures, quienes aceptaron el desafío de producir un cortometraje que acompañara el sencillo musical homónimo.",
    proceso: "Megumi Kouno, una de las animadoras de personajes más talentosas de Japón, lideró la animación física y gestual de la protagonista, Rin. El cortometraje contrasta mundos virtuales luminosos y maleables con una tablet digital, contra la soledad tecnológica y el sacrificio de un padre ante la destrucción inminente de la Tierra. El video acumuló decenas de millones de reproducciones en pocos días y se consolidó como una de las obras pioneras en unir la música electrónica occidental con la industria del anime japonés."
  },

  // CATEGORÍA 4: PELÍCULAS
  {
    id: "peliculas_1", slug: "a-silent-voice", category: "peliculas", number: 1, title: "A Silent Voice", year: "2016",
    credits: [
      { label: "Direction", value: "Naoko Yamada (Kyoto Animation)." },
      { label: "Screenplay", value: "Reiko Yoshida." },
      { label: "Music", value: "Kensuke Ushio." },
      { label: "Original Work", value: "Manga by Yoshitoki Ōima." }
    ],
    origen: "Producida por Kyoto Animation tras adquirir los derechos del multipremiado manga sobre acoso escolar, discapacidad auditiva y redención. La dirección se le encomendó a Naoko Yamada, quien ya había revolucionado el estudio con K-On! y Tamako Love Story.",
    proceso: "Yamada abordó la historia con un enfoque sensorial y cinemático único: encuadres a la altura de los tobillos, pérdida deliberada de foco en los bordes de la lente y el recurso de las \"cruces azules\" tachando los rostros de las personas a las que Shōya es incapaz de mirar a los ojos. Kensuke Ushio compuso la música colocando un micrófono de contacto dentro de un piano vertical desmontado para capturar el sonido del fieltro de los martillos y el aire dentro de la caja de resonancia, permitiendo al espectador experimentar cómo una persona con problemas de audición percibe las vibraciones sonoras."
  },
  {
    id: "peliculas_2", slug: "look-back", category: "peliculas", number: 2, title: "Look Back", year: "2024",
    credits: [
      { label: "Direction & Screenplay", value: "Kiyotaka Oshiyama (Studio Durian)." },
      { label: "Distribution", value: "Avex Pictures." },
      { label: "Original Work", value: "One-shot by Tatsuki Fujimoto." }
    ],
    origen: "Tras su concepción como mediometraje independiente, la obra fue llevada a los cines de Japón y del mundo debido al impacto de su calidad.",
    proceso: "La producción rompió el modelo de comités de cientos de personas: Oshiyama montó un equipo reducido que operaba con herramientas digitales directas para no perder la textura del papel. La famosa secuencia en la que Kyomoto camina bajo la lluvia dando saltos de alegría tras recibir el halago de Fujino se convirtió instantáneamente en una clase magistral de cómo el movimiento puro, la física de la ropa empapada y la deformación expresiva comunican euforia sin necesidad de una sola línea de diálogo."
  },
  {
    id: "peliculas_3", slug: "suzume", category: "peliculas", number: 3, title: "Suzume", year: "2022",
    credits: [
      { label: "Direction & Screenplay", value: "Makoto Shinkai (CoMix Wave Films)." },
      { label: "Char. Design", value: "Masayoshi Tanaka." },
      { label: "Music", value: "RADWIMPS & Kazuma Jinnouchi." }
    ],
    origen: "Tercera entrega de la trilogía temática de desastres naturales de Makoto Shinkai (tras Your Name en 2016 y Weathering With You en 2019). Shinkai estructuró el film como una road movie a través de las ruinas y pueblos abandonados de Japón.",
    proceso: "La historia abordó de forma frontal el trauma colectivo del Gran Terremoto y Tsunami de Japón del 11 de marzo de 2011. Para representar las puertas que abren el paso a las catástrofes, el equipo combinó fondos fotorrealistas pintados a mano con modelos 3D cel-shaded (como la silla de tres patas de Sōta). La colaboración con el compositor de bandas sonoras de Hollywood Kazuma Jinnouchi le dio a RADWIMPS una dimensión orquestal masiva nunca antes vista en la filmografía de Shinkai. Fue seleccionada en la competencia oficial del Festival de Cine de Berlín, hito que el anime no alcanzaba desde El Viaje de Chihiro."
  },
  {
    id: "peliculas_4", slug: "i-want-to-eat-your-pancreas", category: "peliculas", number: 4, title: "I Want to Eat Your Pancreas", year: "2018",
    credits: [
      { label: "Direction & Screenplay", value: "Shin'ichirō Ushijima." },
      { label: "Studio", value: "Studio VOLN." },
      { label: "Char. Design", value: "Yūichi Oka." },
      { label: "Original Work", value: "Novel by Yoru Sumino." }
    ],
    origen: "Basada en la novela homónima que vendió millones de copias en Japón y que ya contaba con una exitosa adaptación cinematográfica en imagen real. Studio VOLN asumió el reto de crear la versión animada definitiva.",
    proceso: "El director Shin'ichirō Ushijima buscó apartarse del melodrama fácil. La paleta de color evoliona a medida que progresa la enfermedad terminal de Sakura: desde tonos pálidos y cenizos iniciales que reflejan el aislamiento del protagonista masculino, hasta explosiones de luz cálida, fuegos artificiales y cerezos en flor durante los viajes que comparten. La película destaca por su ritmo pausado, sus conversaciones realistas en hospitales y bibliotecas, y un giro narrativo abrupto que subraya el valor del tiempo presente."
  },
  {
    id: "peliculas_5", slug: "weathering-with-you", category: "peliculas", number: 5, title: "Weathering With You", year: "2019",
    credits: [
      { label: "Direction & Screenplay", value: "Makoto Shinkai (CoMix Wave Films)." },
      { label: "Music", value: "RADWIMPS." }
    ],
    origen: "El esperado siguiente proyecto de Shinkai tras el fenómeno histórico de Your Name. Consciente de las críticas sobre el cambio climático y las expectativas desmedidas, Shinkai decidió escribir una historia rebelde y deliberadamente egoísta donde dos adolescentes eligen su amor antes que el bienestar de la sociedad.",
    proceso: "Visualmente, es uno de los estudios sobre el agua y la atmósfera más complejos jamás animados. El equipo técnico desarrolló nuevos shaders y técnicas de renderizado para simular miles de gotas de lluvia individuales golpeando el asfalto de Tokio, la refracción de la luz a través de las nubes y la condensación en las ventanas de edificios degradados de Shinjuku. La película recaudó más de 190 millones de dólares y representó a Japón en los Premios Oscar."
  },
  {
    id: "peliculas_6", slug: "the-tunnel-to-summer-the-exit-of-goodbyes", category: "peliculas", number: 6, title: "The Tunnel to Summer, the Exit of Goodbyes", year: "2022",
    credits: [
      { label: "Direction & Screenplay", value: "Tomohisa Taguchi." },
      { label: "Studio", value: "CLAP." },
      { label: "Music", value: "Harumi Fuuki." },
      { label: "Original Work", value: "Light Novel by Mei Hachimoku." }
    ],
    origen: "Producida por el estudio boutique CLAP (responsables de Pompo: The Cinephile). Taguchi buscaba explorar una historia intimista de ciencia ficción sobre el Túnel de Urashima, una leyenda local que concede los deseos más profundos a cambio de envejecer drásticamente mientras se está dentro.",
    proceso: "La película se rodó con un tratamiento de iluminación casi fotográfico: estaciones de tren rurales en el verano japonés, contrastes marcados por la luz del atardecer y un diseño abstracto y deslumbrante del interior del túnel, compuesto por árboles de hojas carmesí en constante caída y geometrías líquidas. Ganó el prestigioso Premio Paul Grimault en el Festival Internacional de Animación de Annecy por su atmósfera melancólica y su poética visual."
  },
  {
    id: "peliculas_7", slug: "josee-the-tiger-and-the-fish", category: "peliculas", number: 7, title: "Josee, the Tiger and the Fish", year: "2020",
    credits: [
      { label: "Direction", value: "Kotaro Tamura." },
      { label: "Studio", value: "BONES." },
      { label: "Screenplay", value: "Sayaka Kuwamura." },
      { label: "Music", value: "Evan Call." },
      { label: "Original Work", value: "Short Story by Seiko Tanabe." }
    ],
    origen: "El estudio BONES decidió adaptar este clásico literario japonés moderno (previamente llevado al cine de imagen real en 2003) enfocándolo desde el empoderamiento personal y el choque entre la libertad y la sobreprotección familiar de una joven en silla de ruedas.",
    proceso: "El equipo de animación prestó extrema atención a la mecánica física del cuerpo de Josee: cómo se impulsaba en su silla de ruedas, la dificultad para sortear pendientes pronunciadas o bordillos en Osaka, y el lenguaje corporal al nadar o deslizarse por el suelo. Visualmente, el filme contrasta la crudeza de las barreras arquitectónicas de la ciudad con las secuencias oníricas submarinas donde Josee imagina el mundo exterior como un vasto océano habitado por peces de colores."
  }
];

function getActiveObra() {
  const params = new URLSearchParams(window.location.search);
  const queryId = (params.get("id") || params.get("obra") || params.get("slug") || "").trim().toLowerCase();
  const queryCat = (params.get("cat") || params.get("categoria") || "").trim().toLowerCase();
  const queryNum = parseInt(params.get("num") || params.get("n") || "0", 10);
  const hashVal = window.location.hash.replace("#", "").trim().toLowerCase();

  if (queryId) {
    const foundById = OBRAS_DATA.find(item => item.id.toLowerCase() === queryId || item.slug.toLowerCase() === queryId);
    if (foundById) return foundById;
  }
  if (queryCat && queryNum >= 1 && queryNum <= 7) {
    const combinedId = `${queryCat}_${queryNum}`;
    const foundByCatNum = OBRAS_DATA.find(item => item.id === combinedId);
    if (foundByCatNum) return foundByCatNum;
  }
  if (hashVal) {
    const foundByHash = OBRAS_DATA.find(item => item.slug.toLowerCase() === hashVal || item.id.toLowerCase() === hashVal);
    if (foundByHash) return foundByHash;
  }
  return OBRAS_DATA[0];
}

function renderObra(obra) {
  const theme = CATEGORY_THEMES[obra.category] || CATEGORY_THEMES.miniseries;

  document.documentElement.style.setProperty("--theme-color", theme.color);
  document.title = `${obra.title} — CELONOR`;

  // Rutas dinámicas unificadas hacia la carpeta img/media/
  const images = [1, 2, 3, 4, 5].map(idx => `img/media/${obra.slug}/${obra.slug}-0${idx}.jpg`);

  const catLabel = document.getElementById("bioCatLabel");
  const yearLabel = document.getElementById("bioYear");
  const indexLabel = document.getElementById("bioIndex");
  const titleEl = document.getElementById("bioTitle");

  if (catLabel) catLabel.textContent = theme.label;
  if (yearLabel) yearLabel.textContent = obra.year;
  if (indexLabel) indexLabel.textContent = `#0${obra.number}`;
  if (titleEl) titleEl.textContent = obra.title;

  const creditsList = document.getElementById("bioCreditsList");
  if (creditsList) {
    creditsList.innerHTML = "";
    const fullCredits = [
      { label: "Category", value: `${theme.label} (Top #0${obra.number})` },
      { label: "Release Year", value: obra.year },
      ...obra.credits
    ];
    fullCredits.forEach(credit => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "bio-credits__item";
      itemDiv.innerHTML = `<dt class="bio-credits__dt">${credit.label}</dt><dd class="bio-credits__dd">${credit.value}</dd>`;
      creditsList.appendChild(itemDiv);
    });
  }

  const origenEl = document.getElementById("bioOrigenText");
  const procesoEl = document.getElementById("bioProcesoText");
  if (origenEl) origenEl.textContent = obra.origen;
  if (procesoEl) procesoEl.textContent = obra.proceso;

  const caption2 = document.getElementById("bioCaption2");
  const code3 = document.getElementById("bioWorkCode3");
  const code4 = document.getElementById("bioWorkCode4");
  
  if (caption2) caption2.textContent = `${theme.code}—0${obra.number} / VISUAL 02`;
  if (code3) code3.textContent = `${theme.code}—0${obra.number}/03`;
  if (code4) code4.textContent = `${theme.code}—0${obra.number}/04`;

  const img1 = document.getElementById("bioImg1");
  const img2 = document.getElementById("bioImg2");
  const img3 = document.getElementById("bioImg3");
  const img4 = document.getElementById("bioImg4");
  const img5 = document.getElementById("bioImg5");

  if (img1) { img1.src = images[0]; img1.alt = `${obra.title} - Visual 1`; }
  if (img2) { img2.src = images[1]; img2.alt = `${obra.title} - Visual 2`; }
  if (img3) { img3.src = images[2]; img3.alt = `${obra.title} - Visual 3`; }
  if (img4) { img4.src = images[3]; img4.alt = `${obra.title} - Visual 4`; }
  if (img5) { img5.src = images[4]; img5.alt = `${obra.title} - Visual 5`; }

  const thumb1 = document.getElementById("showcaseThumb1");
  const thumb2 = document.getElementById("showcaseThumb2");
  const thumb3 = document.getElementById("showcaseThumb3");
  const thumb4 = document.getElementById("showcaseThumb4");

  if (thumb1) { thumb1.src = images[0]; thumb1.alt = `${obra.title} - Visual 1`; }
  if (thumb2) { thumb2.src = images[1]; thumb2.alt = `${obra.title} - Visual 2`; }
  if (thumb3) { thumb3.src = images[2]; thumb3.alt = `${obra.title} - Visual 3`; }

  const showcaseTitle1 = document.getElementById("showcaseTitle1");
  const showcaseTagCat = document.getElementById("showcaseTagCat");
  const showcaseYearLabel = document.getElementById("showcaseYearLabel");
  if (showcaseTitle1) showcaseTitle1.textContent = obra.title.toUpperCase();
  if (showcaseTagCat) showcaseTagCat.textContent = theme.label;
  if (showcaseYearLabel) showcaseYearLabel.textContent = obra.year;

  // Próxima obra en el carrusel
  const currentIndex = OBRAS_DATA.findIndex(item => item.id === obra.id);
  const nextObra = OBRAS_DATA[(currentIndex + 1) % OBRAS_DATA.length];
  const nextWorkLink = document.getElementById("nextWorkLink");
  const showcaseNextTitle = document.getElementById("showcaseNextTitle");
  
  if (thumb4 && nextObra) {
    thumb4.src = `img/media/${nextObra.slug}/${nextObra.slug}-01.jpg`;
    thumb4.alt = `Next: ${nextObra.title}`;
  }
  if (nextWorkLink && nextObra) {
    nextWorkLink.href = `?id=${nextObra.id}`;
  }
  if (showcaseNextTitle && nextObra) {
    showcaseNextTitle.textContent = `NEXT: ${nextObra.title.toUpperCase()} →`;
  }
}

function initAnimations() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  let heroTitlePlayed = false;
  const heroTitleIn = gsap.from(".bio-hero__title", {
    yPercent: 100,
    duration: 1,
    ease: "power4.out",
    paused: true
  });
  const playHeroTitle = () => {
    if (heroTitlePlayed) return;
    heroTitlePlayed = true;
    heroTitleIn.play();
  };
  if (window.CelonorTransitions) window.CelonorTransitions.onReady(playHeroTitle);
  else playHeroTitle();
  setTimeout(playHeroTitle, 4000);

  gsap.to(".bio-hero__img", {
    scale: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".bio-hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  const showcaseSection = document.getElementById("bioShowcaseSection");
  const showcaseTrack = document.getElementById("bioShowcaseTrack");

  if (showcaseSection && showcaseTrack) {
    const getScrollDistance = () => showcaseTrack.scrollWidth - window.innerWidth;

    gsap.to(showcaseTrack, {
      x: () => -Math.max(0, getScrollDistance()),
      ease: "none",
      scrollTrigger: {
        trigger: showcaseSection,
        pin: "#bioShowcasePin",
        start: "top top",
        end: () => `+=${Math.max(600, getScrollDistance())}`,
        scrub: 1,
        invalidateOnRefresh: true
      }
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const activeObra = getActiveObra();
  renderObra(activeObra);
  initAnimations();
});

window.addEventListener("hashchange", () => {
  const activeObra = getActiveObra();
  renderObra(activeObra);
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.refresh();
  }
});