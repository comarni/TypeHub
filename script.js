// TypeHub — Lógica Principal v2.0

(function () {
  'use strict';

  // ========== BANCO DE PALABRAS ==========
  const WORD_BANKS = {
    es: {
      '1k': ['el', 'la', 'de', 'que', 'y', 'en', 'un', 'es', 'se', 'no', 'te', 'lo', 'le', 'da', 'su', 'por', 'son',
        'con', 'para', 'una', 'hay', 'fue', 'ser', 'del', 'al', 'las', 'los', 'muy', 'me', 'si', 'mi', 'ya',
        'todo', 'esta', 'pero', 'más', 'como', 'sus', 'cuando', 'bien', 'puede', 'tiempo', 'casa', 'vida',
        'lado', 'modo', 'agua', 'noche', 'día', 'libro', 'mano', 'cara', 'calle', 'hora', 'mundo', 'gente',
        'forma', 'cosa', 'parte', 'lugar', 'caso', 'algo', 'cada', 'entre', 'año', 'otro', 'tanto', 'mismo'],
      '5k': ['absurdo', 'abierto', 'acción', 'actual', 'agente', 'alcanzar', 'ambiente', 'amor', 'análisis',
        'anterior', 'área', 'arte', 'aspecto', 'balance', 'barrio', 'base', 'batalla', 'caída', 'calidad',
        'cambio', 'camino', 'capital', 'causa', 'centro', 'ciencia', 'color', 'columna', 'comando', 'común',
        'concepto', 'condición', 'configurar', 'conjunto', 'contenido', 'control', 'correcto', 'crisis',
        'cultura', 'datos', 'debate', 'decisión', 'declarar', 'define', 'dificultad', 'digital', 'dirección',
        'diseño', 'dominio', 'economía', 'equipo', 'escena', 'estructura', 'evento', 'evolución', 'factura',
        'familia', 'final', 'física', 'flujo', 'fondo', 'fuerza', 'función', 'gestión', 'global', 'gobierno',
        'historia', 'humano', 'imagen', 'impacto', 'inicio', 'integrar', 'interés', 'interfaz', 'lenguaje',
        'lógica', 'manera', 'mercado', 'método', 'modelo', 'momento', 'motor', 'movimiento', 'nivel', 'nodo',
        'objeto', 'objetivo', 'opción', 'operación', 'orden', 'patrón', 'período', 'permiso', 'proceso',
        'producto', 'programa', 'proyecto', 'protocolo', 'prueba', 'punto', 'razón', 'recurso', 'red',
        'relación', 'resultado', 'riesgo', 'sistema', 'solución', 'servidor', 'servicio', 'situación',
        'tarea', 'técnica', 'tecnología', 'texto', 'tipo', 'trabajo', 'usuario', 'valor', 'variable', 'ventaja'],
      '20k': ['abandonar', 'abarcar', 'abertura', 'abisal', 'abismo', 'abolición', 'acaparar', 'aceleración',
        'acentuado', 'aceptación', 'aclaración', 'acomodación', 'adaptación', 'adicional',
        'administración', 'adquisición', 'adversario', 'afirmación', 'agotamiento', 'alineación', 'alternativa',
        'amplificar', 'anónimo', 'anticipar', 'aparición', 'aproximación', 'arbitrario', 'arquitectura',
        'articulación', 'asignación', 'automatización', 'biodiversidad', 'calibración', 'categorización',
        'circunstancia', 'clasificación', 'colaboración', 'competitividad', 'complejidad', 'comprensión',
        'comunicación', 'concentración', 'consecuencia', 'consideración', 'consolidación', 'constitución',
        'contingencia', 'convergencia', 'coordinación', 'corporativo', 'correspondencia', 'dependencia',
        'derivado', 'descripción', 'desarrollar', 'determinación', 'diferenciación', 'distribución',
        'diversificación', 'documentación', 'elaboración', 'emergente', 'emprendimiento', 'equilibrio',
        'especialización', 'establecimiento', 'estrategia', 'expectativa', 'experiencia', 'explicación',
        'exploración', 'facilitar', 'financiamiento', 'fragmentación', 'fundamental', 'generalización',
        'implementación', 'implicación', 'independencia', 'infraestructura', 'innovación', 'institucional',
        'integración', 'interacción', 'interpretación', 'investigación', 'justificación', 'legitimidad',
        'liberalización', 'mantenimiento', 'maximización', 'mecanismo', 'mejorar', 'monitorización',
        'negociación', 'normativa', 'optimización', 'organización', 'participación', 'perspectiva',
        'planificación', 'posicionamiento', 'potencial', 'presentación', 'priorización', 'profesional',
        'profundizar', 'proporcional', 'racionalidad', 'reconocimiento', 'regeneración', 'regulación',
        'representación', 'restructuración', 'retroalimentación', 'satisfacción', 'segmentación',
        'sostenibilidad', 'transformación', 'transparencia', 'ubicación', 'verificación', 'visualización']
    },
    en: {
      '1k': ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'it', 'for', 'not', 'on', 'with',
        'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her',
        'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up',
        'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time',
        'no', 'just', 'him', 'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could'],
      '5k': ['ability', 'access', 'account', 'action', 'active', 'activity', 'actually', 'addition',
        'address', 'advance', 'advantage', 'affect', 'agency', 'agent', 'agree', 'allow', 'already',
        'always', 'analysis', 'apply', 'approach', 'area', 'argument', 'around', 'assign', 'authority',
        'available', 'avoid', 'balance', 'based', 'behavior', 'better', 'between', 'build', 'button',
        'cache', 'call', 'change', 'class', 'click', 'close', 'code', 'color', 'column', 'common',
        'complete', 'complex', 'concept', 'condition', 'config', 'connect', 'consider', 'contain',
        'control', 'convert', 'correct', 'create', 'critical', 'current', 'cycle', 'data', 'debug',
        'decision', 'define', 'delete', 'deploy', 'detect', 'develop', 'different', 'digital', 'display',
        'divide', 'domain', 'drive', 'effort', 'enable', 'entity', 'error', 'event', 'every', 'execute',
        'exist', 'explain', 'export', 'extend', 'factor', 'feature', 'field', 'filter', 'final', 'find',
        'format', 'frame', 'function', 'global', 'group', 'handle', 'impact', 'import', 'improve',
        'index', 'input', 'install', 'iterate', 'layer', 'length', 'level', 'limit', 'linear', 'link',
        'local', 'logic', 'manage', 'memory', 'message', 'method', 'module', 'monitor', 'move', 'network',
        'object', 'option', 'output', 'package', 'parse', 'pattern', 'point', 'process', 'produce',
        'program', 'project', 'protocol', 'provide', 'query', 'queue', 'reduce', 'remove', 'render',
        'report', 'request', 'require', 'reset', 'resolve', 'return', 'route', 'running', 'screen',
        'search', 'select', 'server', 'service', 'session', 'signal', 'simple', 'source', 'stack',
        'state', 'status', 'store', 'string', 'style', 'submit', 'support', 'system', 'target', 'task',
        'token', 'track', 'trigger', 'type', 'update', 'user', 'valid', 'value', 'version', 'window'],
      '20k': ['abandonment', 'abstraction', 'acceleration', 'accumulation', 'acknowledgment', 'adaptation',
        'administration', 'advancement', 'adversarial', 'aggregation', 'algorithmic', 'alienation',
        'allocation', 'amplification', 'annotation', 'anticipation', 'approximation', 'architecture',
        'articulation', 'assimilation', 'asynchronous', 'authentication', 'authorization', 'automation',
        'benchmarking', 'bidirectional', 'bureaucratic', 'calibration', 'categorization', 'centralization',
        'clarification', 'classification', 'collaboration', 'commercialization', 'communication',
        'compatibility', 'compilation', 'complementary', 'comprehension', 'computation', 'configuration',
        'consolidation', 'containerization', 'contingency', 'conversation', 'coordination', 'correlation',
        'customization', 'decentralization', 'decomposition', 'delegation', 'demonstration', 'dependency',
        'deployment', 'description', 'deterioration', 'differentiation', 'digitalization', 'documentation',
        'elaboration', 'encapsulation', 'engineering', 'establishment', 'evaluation', 'experimentation',
        'explanation', 'extrapolation', 'facilitation', 'fragmentation', 'generalization', 'implementation',
        'indeterminate', 'infrastructure', 'initialization', 'interpretation', 'investigation',
        'justification', 'linearization', 'localization', 'maintenance', 'maximization', 'methodology',
        'minimization', 'modernization', 'monitoring', 'normalization', 'optimization', 'organization',
        'parallelization', 'parameterization', 'participation', 'penetration', 'performance', 'persistence',
        'personalization', 'prioritization', 'professionalization', 'propagation', 'rationalization',
        'reconciliation', 'reconfiguration', 'restructuring', 'segmentation', 'serialization',
        'specialization', 'standardization', 'synchronization', 'transformation', 'transparency',
        'visualization', 'vulnerability', 'decoupling', 'orchestration', 'containerization']
    },
    fr: {
      '1k': ['le', 'la', 'les', 'de', 'du', 'des', 'un', 'une', 'et', 'en', 'est', 'que', 'il', 'elle',
        'se', 'pas', 'je', 'on', 'ce', 'qui', 'au', 'par', 'mon', 'son', 'si', 'sur', 'avec', 'mais',
        'dans', 'nous', 'pour', 'vous', 'tout', 'bien', 'plus', 'faire', 'être', 'avoir', 'dire', 'voir'],
      '5k': ['aborder', 'accord', 'action', 'actuel', 'agent', 'analyser', 'aspect', 'augmenter', 'avancer',
        'balance', 'bloc', 'cadre', 'capital', 'cause', 'centre', 'changer', 'client', 'code', 'commun',
        'concept', 'condition', 'créer', 'cycle', 'déployer', 'développer', 'différent', 'digital',
        'domaine', 'donnée', 'erreur', 'étape', 'évaluer', 'événement', 'fichier', 'filtrer', 'format',
        'fonction', 'gestionnaire', 'groupe', 'installer', 'interface', 'langue', 'logique', 'maintenir',
        'méthode', 'modèle', 'module', 'niveau', 'objet', 'option', 'organiser', 'paramètre', 'processus',
        'programme', 'projet', 'protocole', 'requête', 'réseau', 'résultat', 'service', 'source', 'système',
        'type', 'utiliser', 'valeur', 'variable', 'version', 'vérifier', 'vitesse'],
      '20k': ['accélération', 'adaptation', 'administration', 'amplification', 'anticipation', 'approximation',
        'architecture', 'articulation', 'authentification', 'automatisation', 'catégorisation', 'clarification',
        'collaboration', 'communication', 'configuration', 'consolidation', 'coordination', 'décentralisation',
        'décomposition', 'description', 'différentiation', 'documentation', 'élaboration', 'établissement',
        'expérimentation', 'extrapolation', 'facilitation', 'fragmentation', 'généralisation', 'implémentation',
        'infrastructure', 'interprétation', 'investigation', 'justification', 'maintenance', 'maximisation',
        'methodologie', 'minimisation', 'modernisation', 'normalisation', 'optimisation', 'organisation',
        'participation', 'personnalisation', 'priorisation', 'rationalisation', 'réconciliation', 'sécurisation',
        'segmentation', 'spécialisation', 'standardisation', 'synchronisation', 'transformation', 'visualisation']
    },
    de: {
      '1k': ['ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr', 'der', 'die', 'das', 'und', 'ist', 'in', 'zu',
        'ein', 'von', 'mit', 'auf', 'für', 'an', 'den', 'dem', 'als', 'bei', 'nach', 'nicht', 'war', 'auch'],
      '5k': ['arbeit', 'benutzer', 'code', 'datei', 'system', 'fehler', 'funktion', 'gruppe', 'inhalt',
        'klasse', 'liste', 'methode', 'modul', 'netzwerk', 'objekt', 'paket', 'prozess', 'schnittstelle',
        'server', 'sprache', 'suche', 'typ', 'version', 'wert', 'zustand', 'abfrage', 'änderung', 'speicher'],
      '20k': ['abstraktion', 'authentifizierung', 'automatisierung', 'beschleunigung', 'dokumentation',
        'implementierung', 'infrastruktur', 'konfiguration', 'kommunikation', 'optimierung',
        'organisation', 'parameterisierung', 'protokollierung', 'segmentierung', 'standardisierung',
        'synchronisierung', 'transformation', 'virtualisierung', 'verschlüsselung', 'verwaltung']
    },
    pt: {
      '1k': ['o', 'a', 'os', 'as', 'de', 'do', 'da', 'dos', 'das', 'um', 'uma', 'e', 'em', 'no', 'na',
        'que', 'se', 'não', 'por', 'com', 'para', 'ele', 'ela', 'ser', 'ter', 'fazer', 'ir', 'bem', 'já'],
      '5k': ['acordo', 'ação', 'atual', 'análise', 'aplicar', 'aspecto', 'base', 'código', 'comum',
        'conceito', 'configurar', 'dados', 'decisão', 'definir', 'digital', 'empresa', 'erro', 'estrutura',
        'evento', 'função', 'global', 'grupo', 'imagem', 'instalar', 'integrar', 'linguagem', 'lógica',
        'memória', 'método', 'modelo', 'módulo', 'nível', 'objeto', 'opção', 'processo', 'programa',
        'projeto', 'protocolo', 'resultado', 'serviço', 'sistema', 'tipo', 'usuário', 'valor', 'variável'],
      '20k': ['abstração', 'adaptação', 'administração', 'amplificação', 'autenticação', 'automatização',
        'categorização', 'colaboração', 'comunicação', 'configuração', 'consolidação', 'coordenação',
        'descentralização', 'documentação', 'implementação', 'infraestrutura', 'interpretação',
        'investigação', 'normalização', 'otimização', 'organização', 'participação', 'personalização',
        'priorização', 'segmentação', 'sincronização', 'transformação', 'visualização']
    }
  };

  // ========== TEXTOS PREDEFINIDOS ==========
  const PRESET_TEXTS = {
    literature: [
      'En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor.',
      'Llamadme Ismael. Hace algunos años, sin importar cuántos precisamente, teniendo poco dinero en el bolsillo y nada de particular que me interesase en tierra, pensé en zarpar un poco y ver la parte acuática del mundo.',
      'To be, or not to be, that is the question: whether it is nobler in the mind to suffer the slings and arrows of outrageous fortune, or to take arms against a sea of troubles.',
      'Muchos años después, frente al pelotón de fusilamiento, el coronel Aureliano Buendía había de recordar aquella tarde remota en que su padre lo llevó a conocer el hielo.',
      'La vida es un sueño, y los sueños, sueños son. Temprana muerte no hay vida tan corta que no sea demasiado larga para el que sufre en silencio.',
    ],
    science: [
      'La relatividad especial demuestra que el tiempo y el espacio no son absolutos, sino relativos al observador. A medida que un objeto se acerca a la velocidad de la luz, el tiempo se dilata y el espacio se contrae.',
      'The double helix structure of DNA (discovered by Watson and Crick in 1953) revolutionized our understanding of genetics and hereditary information storage in biological systems.',
      'Quantum mechanics describes the physical properties of matter at subatomic scales. At this level, particles can exist in multiple states simultaneously until they are observed and measured.',
      'La evolución por selección natural, propuesta por Charles Darwin, explica cómo las especies cambian a lo largo del tiempo; los individuos con características más adaptadas tienen mayor probabilidad de sobrevivir.',
      'Las ondas gravitacionales —predichas por Einstein hace un siglo— fueron detectadas por primera vez en 2015. Son perturbaciones en el tejido del espacio-tiempo causadas por eventos cósmicos masivos (p. ej.: fusión de agujeros negros).'
    ],
    philosophy: [
      '\"Cogito, ergo sum\". El único hecho indudable es que yo pienso y, por tanto, existo. Todo lo demás puede ser puesto en duda, pero el acto mismo de dudar prueba la existencia del que duda.',
      'La caverna de Platón nos muestra prisioneros que solo conocen las sombras proyectadas en la pared. Al liberarse, descubren la realidad verdadera; así el filósofo abandona la ignorancia y alcanza el conocimiento.',
      'El imperativo categórico de Kant establece: \"Debemos actuar solo según aquella máxima que puedas querer que se convierta en ley universal\". Es la base de una ética racional y autónoma.',
      '¿La vida examinada vale la pena? La filosofía comienza en la maravilla ante el mundo; esa sensación impulsa la búsqueda de verdad, belleza y justicia en todas sus formas.',
      'Nietzsche proclamó (no literalmente, sino como evento cultural) la muerte de Dios. Sin fundamentos divinos, los humanos deben crear sus propios valores y encontrar significado en la existencia.',
    ],
    tech: [
      'The World Wide Web fue inventado por Tim Berners-Lee en 1989 (en Ginebra, en el CERN). Lo que comenzó como un simple sistema para compartir documentos se convirtió en la base de la vida digital moderna.',
      'Los algoritmos de aprendizaje automático mejoran mediante la experiencia —sin ser programados explícitamente—. Las redes neuronales, inspiradas en el cerebro humano, aprenden a reconocer patrones en enormes conjuntos de datos.',
      'La computación cuántica utiliza qubits que pueden estar en superposición, lo que permite procesar múltiples estados simultáneamente. Esto promete resolver problemas computacionales que son imposibles para ordenadores clásicos: factorización de números grandes, simulación molecular, etc.',
      'El software de código abierto ha transformado la industria. Al hacer el código libremente disponible, desarrolladores en todo el mundo colaboran para construir mejores herramientas, corregir vulnerabilidades e impulsar la innovación.',
      'Los contenedores Docker revolucionaron el despliegue de software al empaquetar aplicaciones con todas sus dependencias. Kubernetes orquestó estos contenedores a escala, habilitando arquitecturas nativas de la nube y prácticas modernas de DevOps.',
    ],
    quotes: [
      '\"La imaginación es más importante que el conocimiento\". El conocimiento es limitado; la imaginación rodea el mundo. — Albert Einstein',
      '\"The only way to do great work is to love what you do\". Si aún no lo has encontrado, sigue buscando; no te conformes. — Steve Jobs',
      '\"En el medio de toda dificultad existe la oportunidad\". El éxito no es final; el fracaso no es fatal: lo que cuenta es el coraje para continuar. — Winston Churchill',
      '\"No hay camino para la paz; la paz es el camino\". No podemos encontrar paz a través de la violencia, solo mediante la comprensión mutua. — Mahatma Gandhi',
      '\"Si piensas que puedes o piensas que no puedes... tienes razón\". El éxito y el fracaso comienzan en la mente, mucho antes de manifestarse en la realidad. — Henry Ford',
    ]
  };

  const PRESET_TEXTS_BY_LANGUAGE = {
    es: {
      literature: [
        '\"En un lugar de la Mancha, de cuyo nombre no quiero acordarme\", no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor.',
        'Muchos anos despues, frente al peloton de fusilamiento, Aureliano Buendia habia de recordar aquella tarde remota en que su padre lo llevo a conocer el hielo.'
      ],
      science: [
        'La relatividad especial demuestra que el tiempo y el espacio no son absolutos, sino relativos al observador.',
        'Las ondas gravitacionales son perturbaciones del espacio tiempo causadas por eventos cosmicos masivos.'
      ],
      philosophy: [
        'Pienso, luego existo: la duda misma demuestra la existencia del que duda.',
        'La caverna de Platon sugiere que confundimos sombras con realidad cuando vivimos en la ignorancia.'
      ],
      tech: [
        'El protocolo TCP IP permite dividir la informacion en paquetes para su envio eficiente por la red.',
        'La arquitectura de microservicios divide aplicaciones en servicios pequenos e independientes.'
      ],
      quotes: [
        'La imaginacion es mas importante que el conocimiento. - Albert Einstein',
        'No hay camino para la paz, la paz es el camino. - Mahatma Gandhi'
      ]
    },
    en: {
      literature: [
        'To be, or not to be, that is the question: whether it is nobler in the mind to suffer.',
        'Call me Ishmael. Some years ago, never mind how long precisely, I thought I would sail about a little.'
      ],
      science: [
        'Quantum mechanics describes the behavior of matter and energy at atomic and subatomic scales.',
        'DNA stores hereditary information and enables biological development and function.'
      ],
      philosophy: [
        'The unexamined life is not worth living. Reflection gives direction to human existence.',
        'Without questioning assumptions, people mistake habit for truth.'
      ],
      tech: [
        'The World Wide Web changed how humans publish, discover, and connect information globally.',
        'Open source software enables collaborative innovation at planetary scale.'
      ],
      quotes: [
        'The only way to do great work is to love what you do. - Steve Jobs',
        'In the middle of every difficulty lies opportunity. - Albert Einstein'
      ]
    },
    fr: {
      literature: [
        'Il etait une fois un voyageur qui cherchait la verite dans les livres et dans le silence.',
        'La nuit tombait doucement sur la ville pendant que les fenetres s illuminaient une a une.'
      ],
      science: [
        'La mecanique quantique decrit des phenomenes physiques a l echelle microscopique.',
        'La biologie moderne etudie les systemes vivants a plusieurs niveaux d organisation.'
      ],
      philosophy: [
        'Penser, c est apprendre a distinguer l apparence et la realite.',
        'La liberte exige la responsabilite de choisir et d assumer ses actes.'
      ],
      tech: [
        'Le web a transforme la communication entre individus, entreprises et institutions.',
        'Les logiciels libres favorisent la cooperation et la transparence.'
      ],
      quotes: [
        'La simplicite est la sophistication supreme. - Leonard de Vinci',
        'Le courage n est pas l absence de peur, mais sa maitrise. - inconnu'
      ]
    },
    de: {
      literature: [
        'Die Stadt schlief noch, als der erste Zug den Bahnhof langsam verliess.',
        'Zwischen alten Buchern fand er einen Brief, der sein Leben veranderte.'
      ],
      science: [
        'Die Relativitatstheorie beschreibt den Zusammenhang von Raum, Zeit und Gravitation.',
        'Moderne Physik untersucht die kleinsten Bausteine der Materie.'
      ],
      philosophy: [
        'Freiheit bedeutet, bewusst zu entscheiden und Verantwortung zu ubernehmen.',
        'Erkenntnis beginnt dort, wo Gewohnheit hinterfragt wird.'
      ],
      tech: [
        'Das Internet verbindet Systeme weltweit und ermoglicht schnellen Informationsaustausch.',
        'Offene Standards verbessern Kompatibilitat und Innovation.'
      ],
      quotes: [
        'Phantasie ist wichtiger als Wissen. - Albert Einstein',
        'Wer ein Warum hat, ertragt fast jedes Wie. - Friedrich Nietzsche'
      ]
    },
    pt: {
      literature: [
        'A cidade acordava devagar enquanto o sol pintava as fachadas antigas.',
        'Entre paginas amareladas, ele encontrou uma historia que mudou seu destino.'
      ],
      science: [
        'A genetica moderna explica como a informacao biologica e transmitida entre geracoes.',
        'A fisica quantica estuda fenomenos em escalas extremamente pequenas.'
      ],
      philosophy: [
        'Pensar com clareza exige questionar certezas e aceitar a duvida.',
        'A liberdade so existe quando acompanhada de responsabilidade.'
      ],
      tech: [
        'A internet transformou a forma como trabalhamos, aprendemos e nos comunicamos.',
        'Software livre permite colaboracao aberta e evolucao continua de ferramentas.'
      ],
      quotes: [
        'A persistencia realiza o impossivel. - proverbio',
        'Quem tem um porque enfrenta qualquer como. - Nietzsche'
      ]
    }
  };

  // ========== ESTADO GLOBAL ==========
  const STATE = {
    isTestActive: false,
    testStartTime: null,
    elapsedTime: 0,
    currentCharIndex: 0,
    wordStartIndex: 0,
    correctChars: 0,
    incorrectChars: 0,
    correctedChars: 0,
    wpmHistory: [],
    rawWpmHistory: [],
    errorsPerSecond: [],
    chartMode: 'scale',
    wpmSnapshotInterval: null,
    _textLines: null,
    _activeLineIdx: 0,
    _prevIncorrectCharsSnapshot: 0,
    testText: '',
    charStates: [],
    prevInputLength: 0,
    currentType: 'words',
    currentDuration: 60,
    currentLanguage: 'es',
    currentDifficulty: '1k',
    currentCategory: 'literature',
    optUppercase: false,
    optPunctuation: false,
    optNumbers: false,
    soundEnabled: true,
    theme: 'serika',
    timerInterval: null,
    currentUser: null,
    lastTabPressAt: 0,
    activityExpanded: true,
    profileMetricMode: 'speed',
    advancedFilters: {
      date: 'all', mode: 'all', time: 'all', words: 'all', difficulty: 'all',
      punctuation: 'all', numbers: 'all', language: 'all', funbox: 'all', tags: 'all'
    },
    languages: {
      base: 'es',
      target: 'en',
      profile: {
        xpByTarget: { es: 0, en: 0, fr: 0 },
        gems: 0,
        completedLessons: {},
        categoryRewards: {},
        preferences: { base: 'es', target: 'en' }
      },
      activeLesson: null,
      session: {
        hearts: 3,
        maxHearts: 3,
        phraseIndex: 0,
        phraseStats: [],
        phraseStartAt: 0,
        totalErrors: 0,
        finished: false
      }
    },
    versus: {
      isActive: false,
      inCountdown: false,
      status: 'idle',
      countdownValue: '-',
      ping: 42,
      modeType: 'time',
      duration: 60,
      wordCount: 50,
      language: 'es',
      difficulty: '1k',
      botDifficulty: 'medium',
      sharedText: '',
      matchStartAt: 0,
      elapsedMs: 0,
      timeLeft: 60,
      timerInterval: null,
      countdownInterval: null,
      userSnapshotInterval: null,
      botInterval: null,
      pingInterval: null,
      botMoodInterval: null,
      matchMeta: null,
      player: {
        currentCharIndex: 0,
        wordStartIndex: 0,
        correctChars: 0,
        incorrectChars: 0,
        correctedChars: 0,
        prevInputLength: 0,
        charStates: [],
        wpmHistory: []
      },
      bot: {
        currentCharIndex: 0,
        correctChars: 0,
        incorrectChars: 0,
        correctedChars: 0,
        charStates: [],
        wpmHistory: [],
        pendingCorrections: [],
        pauseUntil: 0,
        fractionalCarry: 0,
        mood: 'calentando'
      },
      lastResult: null,
      lastConfig: null,
      netStub: {
        queueState: 'idle',
        roomId: null,
        remotePlayerId: 'bot-local',
        remoteSnapshot: null
      }
    }
  };

  const BOT_PROFILES = {
    easy: { minWpm: 40, maxWpm: 60, minAcc: 88, maxAcc: 95, variance: 0.08 },
    medium: { minWpm: 70, maxWpm: 100, minAcc: 94, maxAcc: 97, variance: 0.12 },
    hard: { minWpm: 110, maxWpm: 150, minAcc: 96, maxAcc: 99, variance: 0.1 },
    chaos: { minWpm: 45, maxWpm: 170, minAcc: 80, maxAcc: 98, variance: 0.35 }
  };

  const BOT_MOODS = ['calentando', 'concentrado', 'en racha', 'tilt'];

  // ========== CONFIGURACIÓN CENTRALIZADA ==========
  // Cambiar IS_PROD a false para usar endpoints de prueba (/webhook-test)
  const CONFIG = {
    IS_PROD: true,
    API_HOST: 'https://n8n.srv1369665.hstgr.cloud',
    get API_BASE() { return this.API_HOST + (this.IS_PROD ? '/webhook' : '/webhook-test'); },
    ENDPOINTS: {
      tests:                '/api/tests',
      login:                '/api/login',
      register:             '/api/register',
      profile:              '/api/profile',
      leaderboard:          '/api/leaderboard',
      leaderboardComp:      '/api/leaderboard/competitive',
      languageProgress:     '/api/language-progress',
      languageProfile:      '/api/language-profile'
    },
    url(endpoint) { return this.API_BASE + this.ENDPOINTS[endpoint]; },
    // Para compatibilidad con código que espera arrays de URLs (test + prod)
    urls(endpoint) {
      return [
        this.API_HOST + '/webhook-test' + this.ENDPOINTS[endpoint],
        this.API_HOST + '/webhook' + this.ENDPOINTS[endpoint]
      ];
    }
  };

  // Compatibilidad con constantes antiguas — orden: prod first si IS_PROD=true
  const TEST_WEBHOOK_URLS = CONFIG.IS_PROD
    ? [CONFIG.API_HOST + '/webhook' + CONFIG.ENDPOINTS.tests,      CONFIG.API_HOST + '/webhook-test' + CONFIG.ENDPOINTS.tests]
    : [CONFIG.API_HOST + '/webhook-test' + CONFIG.ENDPOINTS.tests, CONFIG.API_HOST + '/webhook'      + CONFIG.ENDPOINTS.tests];
  const LOGIN_WEBHOOK_URLS = CONFIG.IS_PROD
    ? [CONFIG.API_HOST + '/webhook' + CONFIG.ENDPOINTS.login,      CONFIG.API_HOST + '/webhook-test' + CONFIG.ENDPOINTS.login]
    : [CONFIG.API_HOST + '/webhook-test' + CONFIG.ENDPOINTS.login, CONFIG.API_HOST + '/webhook'      + CONFIG.ENDPOINTS.login];
  const PROFILE_WEBHOOK_BASE_URLS = CONFIG.IS_PROD
    ? [CONFIG.API_HOST + '/webhook' + CONFIG.ENDPOINTS.profile,      CONFIG.API_HOST + '/webhook-test' + CONFIG.ENDPOINTS.profile]
    : [CONFIG.API_HOST + '/webhook-test' + CONFIG.ENDPOINTS.profile, CONFIG.API_HOST + '/webhook'      + CONFIG.ENDPOINTS.profile];
  const LEADERBOARD_WEBHOOK_ENDPOINTS = {
    test: CONFIG.API_HOST + '/webhook-test' + CONFIG.ENDPOINTS.leaderboard,
    prod: CONFIG.API_HOST + '/webhook' + CONFIG.ENDPOINTS.leaderboard
  };
  const LEADERBOARD_COMP_ENDPOINTS = {
    test: CONFIG.API_HOST + '/webhook-test' + CONFIG.ENDPOINTS.leaderboardComp,
    prod: CONFIG.API_HOST + '/webhook' + CONFIG.ENDPOINTS.leaderboardComp
  };

  // ========== VALIDACIÓN DE RESPUESTAS API ==========
  function validateApiUser(data) {
    if (!data || typeof data !== 'object') return false;
    const id = data.userId || data.id || data.n8nUserId;
    const username = data.username;
    const email = data.email;
    return (
      typeof username === 'string' && username.trim().length > 0 &&
      typeof email === 'string' && email.trim().length > 0
    );
  }

  function validateApiTest(data) {
    if (!data || typeof data !== 'object') return false;
    const wpm = Number(data.wpm);
    const acc = Number(data.acc ?? data.accuracy);
    return isFinite(wpm) && wpm >= 0 && isFinite(acc) && acc >= 0;
  }

  let profileSyncInFlight = false;
  let warnedNullOrigin = false;
  let profileSyncRetryAfter = 0;
  let leaderboardSyncInFlight = false;

  function isNullOriginRuntime() {
    return typeof window !== 'undefined'
      && !!window.location
      && (window.location.protocol === 'file:' || window.location.origin === 'null');
  }

  function getLeaderboardWebhookUrls() {
    const search = typeof window !== 'undefined' && window.location ? new URLSearchParams(window.location.search) : null;
    const queryEnv = String(search && (search.get('leaderboardEnv') || search.get('n8nEnv')) || '').trim().toLowerCase();
    const storageEnv = String(localStorage.getItem('n8nLeaderboardEnv') || '').trim().toLowerCase();
    const forcedEnv = queryEnv || storageEnv;

    if (forcedEnv === 'test') return [LEADERBOARD_WEBHOOK_ENDPOINTS.test];
    if (forcedEnv === 'prod') return [LEADERBOARD_WEBHOOK_ENDPOINTS.prod];
    if (forcedEnv === 'both') return [LEADERBOARD_WEBHOOK_ENDPOINTS.prod, LEADERBOARD_WEBHOOK_ENDPOINTS.test];

    const isGithubHost = typeof window !== 'undefined'
      && !!window.location
      && /github\.io$/i.test(String(window.location.hostname || ''));

    if (isGithubHost) {
      return [LEADERBOARD_WEBHOOK_ENDPOINTS.prod, LEADERBOARD_WEBHOOK_ENDPOINTS.test];
    }
    return [LEADERBOARD_WEBHOOK_ENDPOINTS.test, LEADERBOARD_WEBHOOK_ENDPOINTS.prod];
  }

  const ARENAS = [
    { name: 'Bronce', min: 0, max: 500, benefits: ['Sin ventajas'] },
    { name: 'Plata', min: 501, max: 1500, benefits: ['+5% multiplicador XP diario'] },
    { name: 'Oro', min: 1501, max: 3000, benefits: ['Duelos premium', 'Skin de teclado dorada'] },
    { name: 'Platino', min: 3001, max: 6000, benefits: ['+10% XP', 'Prioridad en matchmaking'] },
    { name: 'Diamante', min: 6001, max: 12000, benefits: ['Skins exclusivas', 'Límite superior de liga'] },
    { name: 'Maestro', min: 12001, max: Infinity, benefits: ['Ventajas máximas', 'Sala de duelos Maestro'] }
  ];

  const LEAGUE_NAMES = ['Bronce', 'Plata', 'Oro', 'Platino', 'Diamante', 'Maestro'];

  const STREAK_REWARDS = [
    { min: 1, max: 3, label: '+20% XP', visual: 'Estrella dorada' },
    { min: 4, max: 7, label: '+50% XP + 50 trofeos', visual: 'Barra de fuego' },
    { min: 8, max: 14, label: 'Doble XP + skin temporal', visual: 'Corona semanal' },
    { min: 15, max: Infinity, label: 'Triple XP + entrada torneo', visual: 'Leyenda Activa' }
  ];

  // Datos de lecciones demo (beta) para el modo Aprender Idiomas.
  const LANGUAGE_LABELS = { es: 'Español', en: 'Inglés', fr: 'Francés' };
  const CATEGORY_META = {
    grammar: { icon: '📘', label: 'Gramática' },
    vocabulary: { icon: '📚', label: 'Vocabulario' },
    useful: { icon: '💬', label: 'Frases útiles' },
    spelling: { icon: '✍️', label: 'Ortografía' }
  };

  const LANGUAGE_LESSON_SETS = {
    'es-en': [
      { id: 'grammar-1', category: 'grammar', title: 'Gramática 1: Presente simple', explanation: 'Practica estructuras básicas en presente.', phrases: [{ base: 'Yo trabajo hoy.', target: 'I work today.' }, { base: 'Ella vive aquí.', target: 'She lives here.' }, { base: 'Nosotros estudiamos inglés.', target: 'We study English.' }, { base: 'Ellos comen temprano.', target: 'They eat early.' }, { base: 'Tú hablas rápido.', target: 'You speak fast.' }] },
      { id: 'grammar-2', category: 'grammar', title: 'Gramática 2: Verbo to be', explanation: 'Afirma ideas simples con am/is/are.', phrases: [{ base: 'Yo estoy listo.', target: 'I am ready.' }, { base: 'Ella es mi amiga.', target: 'She is my friend.' }, { base: 'Nosotros estamos en casa.', target: 'We are at home.' }, { base: 'Ellos son estudiantes.', target: 'They are students.' }, { base: 'Tú estás bien.', target: 'You are fine.' }] },
      { id: 'grammar-3', category: 'grammar', title: 'Gramática 3: Artículos', explanation: 'Combina sustantivos con a/the.', phrases: [{ base: 'Tengo un libro.', target: 'I have a book.' }, { base: 'La casa es grande.', target: 'The house is big.' }, { base: 'Es una buena idea.', target: 'It is a good idea.' }, { base: 'El coche es rojo.', target: 'The car is red.' }, { base: 'Necesito una mesa.', target: 'I need a table.' }] },
      { id: 'grammar-4', category: 'grammar', title: 'Gramática 4: Negaciones', explanation: 'Usa do not y does not en frases cortas.', phrases: [{ base: 'Yo no entiendo.', target: 'I do not understand.' }, { base: 'Ella no corre.', target: 'She does not run.' }, { base: 'No tenemos tiempo.', target: 'We do not have time.' }, { base: 'Ellos no vienen hoy.', target: 'They do not come today.' }, { base: 'Tú no trabajas aquí.', target: 'You do not work here.' }] },
      { id: 'grammar-5', category: 'grammar', title: 'Gramática 5: Preguntas', explanation: 'Forma preguntas sencillas en presente.', phrases: [{ base: '¿Trabajas mañana?', target: 'Do you work tomorrow?' }, { base: '¿Ella vive aquí?', target: 'Does she live here?' }, { base: '¿Tienen agua?', target: 'Do they have water?' }, { base: '¿Estamos listos?', target: 'Are we ready?' }, { base: '¿Es tu hermano?', target: 'Is he your brother?' }] },
      { id: 'vocabulary-1', category: 'vocabulary', title: 'Vocabulario 1: Presentarse', explanation: 'Frases básicas para presentarte.', phrases: [{ base: 'Me llamo Ana.', target: 'My name is Ana.' }, { base: 'Soy de España.', target: 'I am from Spain.' }, { base: 'Tengo veinte años.', target: 'I am twenty years old.' }, { base: 'Trabajo en una oficina.', target: 'I work in an office.' }, { base: 'Vivo en Madrid.', target: 'I live in Madrid.' }] },
      { id: 'vocabulary-2', category: 'vocabulary', title: 'Vocabulario 2: Familia', explanation: 'Palabras frecuentes sobre familia.', phrases: [{ base: 'Mi madre está aquí.', target: 'My mother is here.' }, { base: 'Mi padre cocina bien.', target: 'My father cooks well.' }, { base: 'Tengo dos hermanos.', target: 'I have two brothers.' }, { base: 'Ella es mi hermana.', target: 'She is my sister.' }, { base: 'Mi familia es grande.', target: 'My family is big.' }] },
      { id: 'vocabulary-3', category: 'vocabulary', title: 'Vocabulario 3: Casa', explanation: 'Objetos y zonas de la casa.', phrases: [{ base: 'La cocina está limpia.', target: 'The kitchen is clean.' }, { base: 'La puerta está abierta.', target: 'The door is open.' }, { base: 'La ventana es pequeña.', target: 'The window is small.' }, { base: 'Tengo una silla nueva.', target: 'I have a new chair.' }, { base: 'El baño está arriba.', target: 'The bathroom is upstairs.' }] },
      { id: 'vocabulary-4', category: 'vocabulary', title: 'Vocabulario 4: Ciudad', explanation: 'Ubicaciones comunes en la ciudad.', phrases: [{ base: 'El banco está cerca.', target: 'The bank is near.' }, { base: 'Voy a la estación.', target: 'I go to the station.' }, { base: 'El parque es bonito.', target: 'The park is beautiful.' }, { base: 'La tienda abre temprano.', target: 'The store opens early.' }, { base: 'Necesito un mapa.', target: 'I need a map.' }] },
      { id: 'vocabulary-5', category: 'vocabulary', title: 'Vocabulario 5: Comida', explanation: 'Frases de comida cotidiana.', phrases: [{ base: 'Quiero una manzana.', target: 'I want an apple.' }, { base: 'Ella bebe agua.', target: 'She drinks water.' }, { base: 'Comemos arroz hoy.', target: 'We eat rice today.' }, { base: 'El pan está fresco.', target: 'The bread is fresh.' }, { base: 'Necesito leche.', target: 'I need milk.' }] },
      { id: 'useful-1', category: 'useful', title: 'Frases útiles 1: Saludos', explanation: 'Saludos para empezar una conversación.', phrases: [{ base: 'Hola, ¿cómo estás?', target: 'Hello, how are you?' }, { base: 'Buenos días.', target: 'Good morning.' }, { base: 'Buenas tardes.', target: 'Good afternoon.' }, { base: 'Buenas noches.', target: 'Good evening.' }, { base: 'Mucho gusto.', target: 'Nice to meet you.' }] },
      { id: 'useful-2', category: 'useful', title: 'Frases útiles 2: Preguntar', explanation: 'Preguntas prácticas del día a día.', phrases: [{ base: '¿Dónde está el baño?', target: 'Where is the bathroom?' }, { base: '¿Cuánto cuesta esto?', target: 'How much is this?' }, { base: '¿Puedes ayudarme?', target: 'Can you help me?' }, { base: '¿Qué hora es?', target: 'What time is it?' }, { base: '¿Hablas español?', target: 'Do you speak Spanish?' }] },
      { id: 'useful-3', category: 'useful', title: 'Frases útiles 3: Cortesía', explanation: 'Expresiones de cortesía básicas.', phrases: [{ base: 'Por favor, siéntate.', target: 'Please, sit down.' }, { base: 'Muchas gracias.', target: 'Thank you very much.' }, { base: 'De nada.', target: 'You are welcome.' }, { base: 'Lo siento mucho.', target: 'I am very sorry.' }, { base: 'Con permiso.', target: 'Excuse me.' }] },
      { id: 'useful-4', category: 'useful', title: 'Frases útiles 4: Viaje', explanation: 'Frases breves para moverte en viaje.', phrases: [{ base: 'Necesito un taxi.', target: 'I need a taxi.' }, { base: 'Tengo una reserva.', target: 'I have a reservation.' }, { base: 'Quiero ir al hotel.', target: 'I want to go to the hotel.' }, { base: 'El vuelo sale tarde.', target: 'The flight leaves late.' }, { base: 'Busco esta dirección.', target: 'I am looking for this address.' }] },
      { id: 'useful-5', category: 'useful', title: 'Frases útiles 5: Conversación', explanation: 'Frases para mantener la conversación.', phrases: [{ base: 'Estoy aprendiendo inglés.', target: 'I am learning English.' }, { base: 'Hablas muy rápido.', target: 'You speak very fast.' }, { base: '¿Puedes repetir eso?', target: 'Can you repeat that?' }, { base: 'No entiendo esta palabra.', target: 'I do not understand this word.' }, { base: 'Eso suena bien.', target: 'That sounds good.' }] },
      { id: 'spelling-1', category: 'spelling', title: 'Ortografía 1: Palabras comunes', explanation: 'Escribe con precisión palabras frecuentes.', phrases: [{ base: 'Escribe: información.', target: 'information' }, { base: 'Escribe: importante.', target: 'important' }, { base: 'Escribe: diferente.', target: 'different' }, { base: 'Escribe: pregunta.', target: 'question' }, { base: 'Escribe: respuesta.', target: 'answer' }] },
      { id: 'spelling-2', category: 'spelling', title: 'Ortografía 2: Doble consonante', explanation: 'Practica palabras con doble consonante.', phrases: [{ base: 'Escribe: pequeño.', target: 'little' }, { base: 'Escribe: dirección.', target: 'address' }, { base: 'Escribe: ocurrir.', target: 'occur' }, { base: 'Escribe: diferente.', target: 'different' }, { base: 'Escribe: conectar.', target: 'connect' }] },
      { id: 'spelling-3', category: 'spelling', title: 'Ortografía 3: Terminaciones', explanation: 'Cuida las terminaciones frecuentes.', phrases: [{ base: 'Escribe: rápidamente.', target: 'quickly' }, { base: 'Escribe: lentamente.', target: 'slowly' }, { base: 'Escribe: amable.', target: 'friendly' }, { base: 'Escribe: útil.', target: 'useful' }, { base: 'Escribe: correcto.', target: 'correct' }] },
      { id: 'spelling-4', category: 'spelling', title: 'Ortografía 4: Frases cortas', explanation: 'Combina ortografía en frases simples.', phrases: [{ base: 'Escribe: mi nombre es luca.', target: 'my name is luca.' }, { base: 'Escribe: ella vive en paris.', target: 'she lives in paris.' }, { base: 'Escribe: nosotros comemos arroz.', target: 'we eat rice.' }, { base: 'Escribe: ellos trabajan hoy.', target: 'they work today.' }, { base: 'Escribe: yo estudio frances.', target: 'i study french.' }] },
      { id: 'spelling-5', category: 'spelling', title: 'Ortografía 5: Precisión final', explanation: 'Última práctica de precisión.', phrases: [{ base: 'Escribe: where is the station?', target: 'where is the station?' }, { base: 'Escribe: good morning everyone.', target: 'good morning everyone.' }, { base: 'Escribe: i am ready to learn.', target: 'i am ready to learn.' }, { base: 'Escribe: this lesson is complete.', target: 'this lesson is complete.' }, { base: 'Escribe: keep typing every day.', target: 'keep typing every day.' }] }
    ],
    'es-fr': [
      { id: 'grammar-1', category: 'grammar', title: 'Gramática 1: Presente simple', explanation: 'Empieza con estructuras simples del presente.', phrases: [{ base: 'Yo trabajo hoy.', target: 'Je travaille aujourd\'hui.' }, { base: 'Ella vive aquí.', target: 'Elle habite ici.' }, { base: 'Nosotros estudiamos francés.', target: 'Nous etudions le francais.' }, { base: 'Ellos comen temprano.', target: 'Ils mangent tot.' }, { base: 'Tú hablas rápido.', target: 'Tu parles vite.' }] },
      { id: 'grammar-2', category: 'grammar', title: 'Gramática 2: Être', explanation: 'Usa etre para describir estado e identidad.', phrases: [{ base: 'Yo estoy listo.', target: 'Je suis pret.' }, { base: 'Ella es mi amiga.', target: 'Elle est mon amie.' }, { base: 'Nosotros estamos en casa.', target: 'Nous sommes a la maison.' }, { base: 'Ellos son estudiantes.', target: 'Ils sont etudiants.' }, { base: 'Tú estás bien.', target: 'Tu es bien.' }] },
      { id: 'grammar-3', category: 'grammar', title: 'Gramática 3: Artículos', explanation: 'Practica un, une y le/la.', phrases: [{ base: 'Tengo un libro.', target: 'J\'ai un livre.' }, { base: 'La casa es grande.', target: 'La maison est grande.' }, { base: 'Es una buena idea.', target: 'C\'est une bonne idee.' }, { base: 'El coche es rojo.', target: 'La voiture est rouge.' }, { base: 'Necesito una mesa.', target: 'J\'ai besoin d\'une table.' }] },
      { id: 'grammar-4', category: 'grammar', title: 'Gramática 4: Negaciones', explanation: 'Niega frases con ne...pas.', phrases: [{ base: 'Yo no entiendo.', target: 'Je ne comprends pas.' }, { base: 'Ella no corre.', target: 'Elle ne court pas.' }, { base: 'No tenemos tiempo.', target: 'Nous n\'avons pas de temps.' }, { base: 'Ellos no vienen hoy.', target: 'Ils ne viennent pas aujourd\'hui.' }, { base: 'Tú no trabajas aquí.', target: 'Tu ne travailles pas ici.' }] },
      { id: 'grammar-5', category: 'grammar', title: 'Gramática 5: Preguntas', explanation: 'Forma preguntas directas de uso diario.', phrases: [{ base: '¿Trabajas mañana?', target: 'Tu travailles demain ?' }, { base: '¿Ella vive aquí?', target: 'Elle habite ici ?' }, { base: '¿Tienen agua?', target: 'Ils ont de l\'eau ?' }, { base: '¿Estamos listos?', target: 'Nous sommes prets ?' }, { base: '¿Es tu hermano?', target: 'C\'est ton frere ?' }] },
      { id: 'vocabulary-1', category: 'vocabulary', title: 'Vocabulario 1: Presentarse', explanation: 'Frases para hablar de ti.', phrases: [{ base: 'Me llamo Ana.', target: 'Je m\'appelle Ana.' }, { base: 'Soy de España.', target: 'Je viens d\'Espagne.' }, { base: 'Tengo veinte años.', target: 'J\'ai vingt ans.' }, { base: 'Trabajo en una oficina.', target: 'Je travaille dans un bureau.' }, { base: 'Vivo en Madrid.', target: 'J\'habite a Madrid.' }] },
      { id: 'vocabulary-2', category: 'vocabulary', title: 'Vocabulario 2: Familia', explanation: 'Habla de miembros de tu familia.', phrases: [{ base: 'Mi madre está aquí.', target: 'Ma mere est ici.' }, { base: 'Mi padre cocina bien.', target: 'Mon pere cuisine bien.' }, { base: 'Tengo dos hermanos.', target: 'J\'ai deux freres.' }, { base: 'Ella es mi hermana.', target: 'Elle est ma soeur.' }, { base: 'Mi familia es grande.', target: 'Ma famille est grande.' }] },
      { id: 'vocabulary-3', category: 'vocabulary', title: 'Vocabulario 3: Casa', explanation: 'Palabras comunes de casa.', phrases: [{ base: 'La cocina está limpia.', target: 'La cuisine est propre.' }, { base: 'La puerta está abierta.', target: 'La porte est ouverte.' }, { base: 'La ventana es pequeña.', target: 'La fenetre est petite.' }, { base: 'Tengo una silla nueva.', target: 'J\'ai une nouvelle chaise.' }, { base: 'El baño está arriba.', target: 'La salle de bain est en haut.' }] },
      { id: 'vocabulary-4', category: 'vocabulary', title: 'Vocabulario 4: Ciudad', explanation: 'Términos simples para moverte.', phrases: [{ base: 'El banco está cerca.', target: 'La banque est proche.' }, { base: 'Voy a la estación.', target: 'Je vais a la gare.' }, { base: 'El parque es bonito.', target: 'Le parc est joli.' }, { base: 'La tienda abre temprano.', target: 'Le magasin ouvre tot.' }, { base: 'Necesito un mapa.', target: 'J\'ai besoin d\'une carte.' }] },
      { id: 'vocabulary-5', category: 'vocabulary', title: 'Vocabulario 5: Comida', explanation: 'Frases de comida diaria.', phrases: [{ base: 'Quiero una manzana.', target: 'Je veux une pomme.' }, { base: 'Ella bebe agua.', target: 'Elle boit de l\'eau.' }, { base: 'Comemos arroz hoy.', target: 'Nous mangeons du riz aujourd\'hui.' }, { base: 'El pan está fresco.', target: 'Le pain est frais.' }, { base: 'Necesito leche.', target: 'J\'ai besoin de lait.' }] },
      { id: 'useful-1', category: 'useful', title: 'Frases útiles 1: Saludos', explanation: 'Saludos para iniciar conversación.', phrases: [{ base: 'Hola, ¿cómo estás?', target: 'Salut, comment ca va ?' }, { base: 'Buenos días.', target: 'Bonjour.' }, { base: 'Buenas tardes.', target: 'Bon apres-midi.' }, { base: 'Buenas noches.', target: 'Bonsoir.' }, { base: 'Mucho gusto.', target: 'Ravi de te rencontrer.' }] },
      { id: 'useful-2', category: 'useful', title: 'Frases útiles 2: Preguntar', explanation: 'Preguntas útiles en contexto real.', phrases: [{ base: '¿Dónde está el baño?', target: 'Ou sont les toilettes ?' }, { base: '¿Cuánto cuesta esto?', target: 'Combien ca coute ?' }, { base: '¿Puedes ayudarme?', target: 'Peux-tu m\'aider ?' }, { base: '¿Qué hora es?', target: 'Quelle heure est-il ?' }, { base: '¿Hablas español?', target: 'Tu parles espagnol ?' }] },
      { id: 'useful-3', category: 'useful', title: 'Frases útiles 3: Cortesía', explanation: 'Expresiones de cortesía frecuentes.', phrases: [{ base: 'Por favor, siéntate.', target: 'S\'il te plait, assieds-toi.' }, { base: 'Muchas gracias.', target: 'Merci beaucoup.' }, { base: 'De nada.', target: 'De rien.' }, { base: 'Lo siento mucho.', target: 'Je suis desole.' }, { base: 'Con permiso.', target: 'Excuse-moi.' }] },
      { id: 'useful-4', category: 'useful', title: 'Frases útiles 4: Viaje', explanation: 'Frases rápidas para viajes.', phrases: [{ base: 'Necesito un taxi.', target: 'J\'ai besoin d\'un taxi.' }, { base: 'Tengo una reserva.', target: 'J\'ai une reservation.' }, { base: 'Quiero ir al hotel.', target: 'Je veux aller a l\'hotel.' }, { base: 'El vuelo sale tarde.', target: 'Le vol part tard.' }, { base: 'Busco esta dirección.', target: 'Je cherche cette adresse.' }] },
      { id: 'useful-5', category: 'useful', title: 'Frases útiles 5: Conversación', explanation: 'Mantén una conversación básica.', phrases: [{ base: 'Estoy aprendiendo francés.', target: 'J\'apprends le francais.' }, { base: 'Hablas muy rápido.', target: 'Tu parles trop vite.' }, { base: '¿Puedes repetir eso?', target: 'Peux-tu repeter ca ?' }, { base: 'No entiendo esta palabra.', target: 'Je ne comprends pas ce mot.' }, { base: 'Eso suena bien.', target: 'Ca sonne bien.' }] },
      { id: 'spelling-1', category: 'spelling', title: 'Ortografía 1: Palabras comunes', explanation: 'Escribe con precisión palabras básicas.', phrases: [{ base: 'Escribe: información.', target: 'information' }, { base: 'Escribe: importante.', target: 'important' }, { base: 'Escribe: diferente.', target: 'different' }, { base: 'Escribe: pregunta.', target: 'question' }, { base: 'Escribe: respuesta.', target: 'reponse' }] },
      { id: 'spelling-2', category: 'spelling', title: 'Ortografía 2: Acentos', explanation: 'Practica escritura sin perder claridad.', phrases: [{ base: 'Escribe: presentación.', target: 'presentation' }, { base: 'Escribe: conversación.', target: 'conversation' }, { base: 'Escribe: estación.', target: 'station' }, { base: 'Escribe: habitación.', target: 'chambre' }, { base: 'Escribe: dirección.', target: 'adresse' }] },
      { id: 'spelling-3', category: 'spelling', title: 'Ortografía 3: Frases cortas', explanation: 'Integra precisión en frases simples.', phrases: [{ base: 'Escribe: je m appelle luca.', target: 'je m appelle luca.' }, { base: 'Escribe: nous sommes prets.', target: 'nous sommes prets.' }, { base: 'Escribe: elle parle vite.', target: 'elle parle vite.' }, { base: 'Escribe: ils mangent tot.', target: 'ils mangent tot.' }, { base: 'Escribe: je suis ici.', target: 'je suis ici.' }] },
      { id: 'spelling-4', category: 'spelling', title: 'Ortografía 4: Preguntas', explanation: 'Refuerza preguntas útiles.', phrases: [{ base: 'Escribe: ou est le bus ?', target: 'ou est le bus ?' }, { base: 'Escribe: comment ca va ?', target: 'comment ca va ?' }, { base: 'Escribe: quelle heure est il ?', target: 'quelle heure est il ?' }, { base: 'Escribe: ou est la gare ?', target: 'ou est la gare ?' }, { base: 'Escribe: peux tu aider ?', target: 'peux tu aider ?' }] },
      { id: 'spelling-5', category: 'spelling', title: 'Ortografía 5: Precisión final', explanation: 'Cierra el bloque con precisión alta.', phrases: [{ base: 'Escribe: bonjour a tous.', target: 'bonjour a tous.' }, { base: 'Escribe: je veux apprendre.', target: 'je veux apprendre.' }, { base: 'Escribe: merci pour ton aide.', target: 'merci pour ton aide.' }, { base: 'Escribe: cette lecon est finie.', target: 'cette lecon est finie.' }, { base: 'Escribe: continue demain.', target: 'continue demain.' }] }
    ]
  };

  const PUNCTUATION = ['.', ',', ';', ':', '!', '?'];
  const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  const $ = id => document.getElementById(id);
  const ELEMENTS = {
    navButtons: document.querySelectorAll('.nav-btn'),
    sections: document.querySelectorAll('.section'),
    testInput: $('testInput'),
    // 3-line player elements
    testArea: $('testArea'),
    textViewport: $('textViewport'),
    textTrack: $('textTrack'),
    testHint: $('testHint'),
    shortcutsBar: document.querySelector('.shortcuts'),
    // legacy (kept for result rendering)
    textDisplay: $('textDisplay'),
    typingCaret: $('typingCaret'),
    // Nav auth elements
    navLoginBtn: $('navLoginBtn'),
    navUserPill: $('navUserPill'),
    navAvatarLetter: $('navAvatarLetter'),
    navUsername: $('navUsername'),
    topBanner: $('topBanner'),
    bannerClose: $('bannerClose'),
    toastContainer: $('toastContainer'),
    wpmValue: $('wpmValue'),
    accValue: $('accValue'),
    timerValue: $('timerValue'),
    typeWords: $('typeWords'),
    typeTexts: $('typeTexts'),
    testLanguage: $('testLanguage'),
    difficultySelect: $('difficultySelect'),
    diffGroup: $('diffGroup'),
    textCategoryGroup: $('textCategoryGroup'),
    textCategoryChips: document.querySelectorAll('.category-chip'),
    timeSelect: $('timeSelect'),
    timeLabel: $('timeLabel'),
    timeGroup: $('timeGroup'),
    optUppercase: $('optUppercase'),
    optPunctuation: $('optPunctuation'),
    optNumbers: $('optNumbers'),
    wordOptions: $('wordOptions'),
    restartBtn: $('restartBtn'),
    retryBtn: $('retryBtn'),
    results: $('results'),
    // Nuevos elementos de stat blocks Monkeytype
    resultWpmBig: $('resultWpmBig'),
    resultWpmSmall: $('resultWpmSmall'),
    resultAccBig: $('resultAccBig'),
    resultAccSmall: $('resultAccSmall'),
    resultRawWpmBig: $('resultRawWpmBig'),
    resultRawWpmSmall: $('resultRawWpmSmall'),
    resultCharsBreakdown: $('resultCharsBreakdown'),
    resultConsistencyBig: $('resultConsistencyBig'),
    resultConsistencySmall: $('resultConsistencySmall'),
    resultTimeBig: $('resultTimeBig'),
    resultTimeSmall: $('resultTimeSmall'),
    resultTimeExtra: $('resultTimeExtra'),
    resultTestType: $('resultTestType'),
    resultTestLanguage: $('resultTestLanguage'),
    chartModeButtons: document.querySelectorAll('.chart-mode-btn'),
    modesPanel: $('modesPanel') || document.querySelector('.modes-panel'),
    configBar: $('configBar'),
    configToggleBtn: $('configToggleBtn'),
    testStats: $('testStats'),
    nextTestBtn: $('nextTestBtn'),
    repeatTestBtn: $('repeatTestBtn'),
    resultsNote: $('resultsNote'),
    // Antiguos elementos (legacy)
    resultWpm: $('resultWpm'),
    resultAcc: $('resultAcc'),
    resultErrors: $('resultErrors'),
    resultCorrect: $('resultCorrect'),
    resultCorrected: $('resultCorrected'),
    resultTime: $('resultTime'),
    wpmChart: $('wpmChart'),
    themeButtons: document.querySelectorAll('.theme-btn'),
    soundToggle: $('soundToggle'),
    clearDataBtn: $('clearDataBtn'),
    modalOverlay: $('modalOverlay'),
    closeResultsBtn: $('closeResultsBtn'),
    registerPanel: $('registerPanel'),
    loginPanel: $('loginPanel'),
    profilePanel: $('profilePanel'),
    registerForm: $('registerForm'),
    loginForm: $('loginForm'),
    toLoginLink: $('toLoginLink'),
    toRegisterLink: $('toRegisterLink'),
    logoutBtn: $('logoutBtn'),
    profileUsername: $('profileUsername'),
    profileEmail: $('profileEmail'),
    profileDate: $('profileDate'),
    profileDaysAgo: $('profileDaysAgo'),
    profileLevel: $('profileLevel'),
    profileTotalXp: $('profileTotalXp'),
    profileNextPct: $('profileNextPct'),
    profileXpUntil: $('profileXpUntil'),
    statTestsStarted: $('statTestsStarted'),
    statTestsCompleted: $('statTestsCompleted'),
    statRestarts: $('statRestarts'),
    statTotalTime: $('statTotalTime'),
    editProfileBtn: $('editProfileBtn'),
    copyPublicLinkBtn: $('copyPublicLinkBtn'),
    reloadProfileBtn: $('reloadProfileBtn'),
    reloadProfileStatus: $('reloadProfileStatus'),
    profileSyncMeta: $('profileSyncMeta'),
    profileSyncDebug: $('profileSyncDebug'),
    pb15: $('pb15'),
    pb30: $('pb30'),
    pb50w: $('pb50w'),
    pb100w: $('pb100w'),
    pb15Date: $('pb15Date'),
    pb30Date: $('pb30Date'),
    pb50wDate: $('pb50wDate'),
    pb100wDate: $('pb100wDate'),
    showAllPbsBtn: $('showAllPbsBtn'),
    activityRangeSelect: $('activityRangeSelect'),
    activityCountInfo: $('activityCountInfo'),
    activityCountValue: $('activityCountValue'),
    activityLessLink: $('activityLessLink'),
    activityMoreLink: $('activityMoreLink'),
    activityList: $('activityList'),
    profileTrendChart: $('profileTrendChart'),
    filterDate: $('filterDate'),
    filterMode: $('filterMode'),
    filterTime: $('filterTime'),
    filterWords: $('filterWords'),
    filterDifficulty: $('filterDifficulty'),
    filterPunctuation: $('filterPunctuation'),
    filterNumbers: $('filterNumbers'),
    filterLanguage: $('filterLanguage'),
    filterFunbox: $('filterFunbox'),
    filterTags: $('filterTags'),
    speedTrend: $('speedTrend'),
    rangeWords: $('rangeWords'),
    rangeStarted: $('rangeStarted'),
    rangeCompleted: $('rangeCompleted'),
    rangeRestarts: $('rangeRestarts'),
    rangeTime: $('rangeTime'),
    rangeBestWpm: $('rangeBestWpm'),
    rangeAvgWpm: $('rangeAvgWpm'),
    rangeAvgWpm10: $('rangeAvgWpm10'),
    rangeBestRaw: $('rangeBestRaw'),
    rangeAvgRaw: $('rangeAvgRaw'),
    rangeAvgRaw10: $('rangeAvgRaw10'),
    rangeBestAcc: $('rangeBestAcc'),
    rangeAvgAcc: $('rangeAvgAcc'),
    rangeAvgAcc10: $('rangeAvgAcc10'),
    rangeBestCon: $('rangeBestCon'),
    rangeAvgCon: $('rangeAvgCon'),
    rangeAvgCon10: $('rangeAvgCon10'),
    exportCsvBtn: $('exportCsvBtn'),
    loadMoreTestsBtn: $('loadMoreTestsBtn'),
    testsHistory: $('testsHistory'),
    leaderboardTableBody: $('leaderboardTableBody'),
    reloadLeaderboardBtn: $('reloadLeaderboardBtn'),
    reloadLeaderboardStatus: $('reloadLeaderboardStatus'),
    leaderboardSyncMeta: $('leaderboardSyncMeta'),
    leaderboardSyncDebug: $('leaderboardSyncDebug'),
    progressChartContainer: $('progressChartContainer'),
    progressChart: $('progressChart'),
    progressTabs: document.querySelectorAll('.progress-tab'),
    versusModeType: $('versusModeType'),
    versusTimeGroup: $('versusTimeGroup'),
    versusWordsGroup: $('versusWordsGroup'),
    versusTimeSelect: $('versusTimeSelect'),
    versusWordsSelect: $('versusWordsSelect'),
    versusLanguage: $('versusLanguage'),
    versusDifficulty: $('versusDifficulty'),
    versusBotDifficulty: $('versusBotDifficulty'),
    versusStartBtn: $('versusStartBtn'),
    versusLoginHint: $('versusLoginHint'),
    versusUserName: $('versusUserName'),
    versusUserRank: $('versusUserRank'),
    versusUserWpm: $('versusUserWpm'),
    versusUserAcc: $('versusUserAcc'),
    versusUserConsistency: $('versusUserConsistency'),
    versusUserProgress: $('versusUserProgress'),
    versusUserText: $('versusUserText'),
    versusUserArea: $('versusUserArea'),
    versusUserCaret: $('versusUserCaret'),
    versusInput: $('versusInput'),
    versusBotName: $('versusBotName'),
    versusBotRank: $('versusBotRank'),
    versusBotWpm: $('versusBotWpm'),
    versusBotAcc: $('versusBotAcc'),
    versusBotConsistency: $('versusBotConsistency'),
    versusBotProgress: $('versusBotProgress'),
    versusBotText: $('versusBotText'),
    versusBotMood: $('versusBotMood'),
    versusCountdown: $('versusCountdown'),
    versusMatchStatus: $('versusMatchStatus'),
    versusObjective: $('versusObjective'),
    versusPing: $('versusPing'),
    versusCountdownOverlay: $('versusCountdownOverlay'),
    versusCountdownNumber: $('versusCountdownNumber'),
    versusModalOverlay: $('versusModalOverlay'),
    versusResultsModal: $('versusResultsModal'),
    closeVersusResultsBtn: $('closeVersusResultsBtn'),
    versusResultTitle: $('versusResultTitle'),
    versusResultFlavor: $('versusResultFlavor'),
    versusResultUserWpm: $('versusResultUserWpm'),
    versusResultUserAcc: $('versusResultUserAcc'),
    versusResultBotWpm: $('versusResultBotWpm'),
    versusResultBotAcc: $('versusResultBotAcc'),
    versusResultDiff: $('versusResultDiff'),
    versusResultMeta: $('versusResultMeta'),
    versusWpmChart: $('versusWpmChart'),
    versusRematchBtn: $('versusRematchBtn'),
    versusNewMatchBtn: $('versusNewMatchBtn'),
    versusDuelsPlayed: $('versusDuelsPlayed'),
    versusWinRate: $('versusWinRate'),
    versusBestWpm: $('versusBestWpm'),
    versusBotPlayed: $('versusBotPlayed'),
    versusOnlinePlayed: $('versusOnlinePlayed'),
    versusOnlineWinRate: $('versusOnlineWinRate'),
    arenaCurrentName: $('arenaCurrentName'),
    arenaCurrentTrophies: $('arenaCurrentTrophies'),
    arenaNextThreshold: $('arenaNextThreshold'),
    arenaSidebarProgress: $('arenaSidebarProgress'),
    arenaBenefitsToggle: $('arenaBenefitsToggle'),
    arenaBenefitsList: $('arenaBenefitsList'),
    top100Fab: $('top100Fab'),
    top100Dropdown: $('top100Dropdown'),
    top100MiniBoard: $('top100MiniBoard'),
    competitiveToast: $('competitiveToast'),
    competitiveArenaLabel: $('competitiveArenaLabel'),
    competitiveTrophiesLabel: $('competitiveTrophiesLabel'),
    competitiveLeagueLabel: $('competitiveLeagueLabel'),
    competitivePointsLabel: $('competitivePointsLabel'),
    competitiveDivisionProgress: $('competitiveDivisionProgress'),
    streakRingChart: $('streakRingChart'),
    streakRingCenter: $('streakRingCenter'),
    streakRewardLabel: $('streakRewardLabel'),
    competitiveLeagueMini: $('competitiveLeagueMini'),
    competitiveWeeklyChart: $('competitiveWeeklyChart'),
    leaguesTableBody: $('leaguesTableBody'),
    versusEliteBadge: $('versusEliteBadge'),
    profileLeagueBadge: $('profileLeagueBadge'),
    profileLeaguePoints: $('profileLeaguePoints'),
    profileLeagueProgress: $('profileLeagueProgress'),
    profileArenaBadge: $('profileArenaBadge'),
    profileArenaTrophies: $('profileArenaTrophies'),
    profileArenaChart: $('profileArenaChart'),
    langBaseSelect: $('langBaseSelect'),
    langTargetSelect: $('langTargetSelect'),
    languagesActivePath: $('languagesActivePath'),
    languagesMotivation: $('languagesMotivation'),
    langProfileTarget: $('langProfileTarget'),
    langProfileXp: $('langProfileXp'),
    langProfileHearts: $('langProfileHearts'),
    langProfileGems: $('langProfileGems'),
    langProfileXpProgress: $('langProfileXpProgress'),
    languagesPath: $('languagesPath'),
    languageLessonPanel: $('languageLessonPanel'),
    languageLessonTitle: $('languageLessonTitle'),
    languageLessonDescription: $('languageLessonDescription'),
    languageLessonProgressLabel: $('languageLessonProgressLabel'),
    languageLessonAcc: $('languageLessonAcc'),
    languageLessonWpm: $('languageLessonWpm'),
    languageLessonProgressBar: $('languageLessonProgressBar'),
    languagePromptBase: $('languagePromptBase'),
    languagePromptHint: $('languagePromptHint'),
    languageTargetDisplay: $('languageTargetDisplay'),
    languageTypingInput: $('languageTypingInput'),
    languageCheckBtn: $('languageCheckBtn'),
    languageLessonFeedback: $('languageLessonFeedback'),
    languageCloseLessonBtn: $('languageCloseLessonBtn'),
    languageDonateBtn: $('languageDonateBtn'),
    langTotalXpProfile: $('langTotalXpProfile'),
    langLessonsDoneProfile: $('langLessonsDoneProfile'),
    langGemsProfile: $('langGemsProfile')
  };

  function init() {
    loadSettings();
    setupEventListeners();
    setCategoryChipActive(STATE.currentCategory);
    updateTimerUiForMode();
    generateTestText();
    // Use resetTest() so 3-line engine (buildTextLines) runs on first load
    resetTest();
    initVersusUI();
    initLanguagesBeta();
    initCompetitiveUI();
    initOnboarding();
    initCookieBanner();
  }

  function initOnboarding() {
    if (localStorage.getItem('typehubVisited')) return;
    const overlay = document.getElementById('onboardingOverlay');
    const modal = document.getElementById('onboardingModal');
    if (!overlay || !modal) return;
    overlay.style.display = 'block';
    modal.style.display = 'block';

    const steps = modal.querySelectorAll('.onboarding-step');
    let current = 0;

    function showStep(n) {
      steps.forEach((s, i) => s.classList.toggle('active', i === n));
      current = n;
    }

    modal.querySelectorAll('.onboarding-next').forEach(btn => {
      btn.addEventListener('click', () => {
        if (current < steps.length - 1) showStep(current + 1);
      });
    });

    modal.querySelectorAll('.onboarding-prev').forEach(btn => {
      btn.addEventListener('click', () => {
        if (current > 0) showStep(current - 1);
      });
    });

    function closeOnboarding() {
      overlay.style.display = 'none';
      modal.style.display = 'none';
      localStorage.setItem('typehubVisited', '1');
    }

    const finishBtn = document.getElementById('onboardingFinish');
    if (finishBtn) finishBtn.addEventListener('click', closeOnboarding);

    const skipBtn = document.getElementById('onboardingSkip');
    if (skipBtn) skipBtn.addEventListener('click', closeOnboarding);

    overlay.addEventListener('click', closeOnboarding);
  }

  function initCookieBanner() {
    if (localStorage.getItem('cookieConsent')) return;
    const banner = document.getElementById('cookieBanner');
    if (!banner) return;
    banner.style.display = 'block';

    function acceptCookies(type) {
      localStorage.setItem('cookieConsent', type);
      banner.style.display = 'none';
    }

    const acceptBtn = document.getElementById('cookieAccept');
    const declineBtn = document.getElementById('cookieDecline');
    if (acceptBtn) acceptBtn.addEventListener('click', () => acceptCookies('all'));
    if (declineBtn) declineBtn.addEventListener('click', () => acceptCookies('essential'));
  }

  function loadSettings() {
    const savedTheme = localStorage.getItem('theme') || 'serika';
    const savedSound = localStorage.getItem('soundEnabled');
    STATE.theme = savedTheme;
    STATE.soundEnabled = savedSound !== 'false';
    applyTheme(savedTheme);
    updateThemeButtons();
    ELEMENTS.soundToggle.checked = STATE.soundEnabled;
    loadCurrentUser();
  }

  function isTokenExpired(user) {
    if (!user || !user.tokenExpires) return false; // sin token = no expira (sesión local)
    return Date.now() > user.tokenExpires;
  }

  function loadCurrentUser() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      // Si el token existe y ha expirado, cerrar sesión automáticamente
      if (isTokenExpired(parsed)) {
        localStorage.removeItem('currentUser');
        STATE.currentUser = null;
        return;
      }
      STATE.currentUser = parsed;
      updateAuthUI();
    }
  }

  async function registerUser(username, email, password) {
    if (!username || !email || !password) {
      alert('Todos los campos son requeridos');
      return false;
    }
    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    const normalizedUsername = String(username).trim();
    const normalizedEmail = String(email).trim().toLowerCase();
    const users = JSON.parse(localStorage.getItem('users') || '{}');

    const createdAtIso = new Date().toISOString();
    const profileSeed = {
      created_at: createdAtIso,
      tests_started: 0,
      restarts: 0,
      total_xp: 0,
      arena_trophies: 0,
      arena_name: 'Bronce',
      league_points: 0,
      league_label: 'Bronce I',
      avg_wpm: 0,
      best_wpm: 0,
      total_tests: 0,
      app_version: '1.0'
    };

    // Usar siempre el webhook de producción si IS_PROD, test como fallback
    const registerWebhookUrls = CONFIG.IS_PROD
      ? [CONFIG.API_HOST + '/webhook/api/register', CONFIG.API_HOST + '/webhook-test/api/register']
      : [CONFIG.API_HOST + '/webhook-test/api/register', CONFIG.API_HOST + '/webhook/api/register'];

    const requestBody = {
      username: normalizedUsername,
      email: normalizedEmail,
      password: password,
      appversion: profileSeed.app_version,
      created_at: profileSeed.created_at,
      tests_started: profileSeed.tests_started,
      restarts: profileSeed.restarts,
      total_xp: profileSeed.total_xp,
      arena_trophies: profileSeed.arena_trophies,
      arena_name: profileSeed.arena_name,
      league_points: profileSeed.league_points,
      league_label: profileSeed.league_label,
      avg_wpm: profileSeed.avg_wpm,
      best_wpm: profileSeed.best_wpm,
      total_tests: profileSeed.total_tests,
      app_version: profileSeed.app_version
    };

    const normalizePayload = data => {
      if (data === null || data === undefined) return null;

      let current = data;
      for (let i = 0; i < 3 && typeof current === 'string'; i++) {
        try {
          current = JSON.parse(current);
        } catch (_) {
          return { raw: current };
        }
      }

      if (Array.isArray(current)) {
        const first = current[0] || null;
        if (typeof first === 'string') {
          let parsed = first;
          for (let i = 0; i < 3 && typeof parsed === 'string'; i++) {
            try {
              parsed = JSON.parse(parsed);
            } catch (_) {
              return { raw: first };
            }
          }
          return parsed;
        }
        return first;
      }

      return current;
    };

    const parseRegisterResult = data => {
      const normalized = normalizePayload(data);
      if (!normalized) {
        return {
          payload: null,
          success: false,
          statusCode: 0,
          message: ''
        };
      }

      const nested = normalizePayload(normalized.data);
      const payload = nested && typeof nested === 'object' ? nested : normalized;
      const statusCode = Number(payload.statusCode || normalized.statusCode || 0);
      const message = String(payload.error || payload.message || normalized.error || normalized.message || '');

      return {
        payload: payload,
        success: payload.success === true,
        statusCode: statusCode,
        message: message
      };
    };

    let payload;
    let payloadStatusCode = 0;
    try {
      const webhookResults = await Promise.allSettled(
        registerWebhookUrls.map(async url => {
          try {
            const response = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(requestBody)
            });

            const data = await parseWebhookResponse(response);
            return {
              ok: response.ok,
              status: response.status,
              data: data
            };
          } catch (_) {
            return {
              ok: false,
              status: 0,
              data: null
            };
          }
        })
      );


      const duplicateResult = webhookResults.find(result => {
        if (result.status !== 'fulfilled' || !result.value) return false;
        const parsed = parseRegisterResult(result.value.data);
        const responseStatus = Number(result.value.status || 0);
        const payloadText = JSON.stringify(parsed.payload || result.value.data || '').toLowerCase();
        return responseStatus === 409
          || parsed.statusCode === 409
          || payloadText.includes('email ya registrado');
      });

      if (duplicateResult && duplicateResult.status === 'fulfilled') {
        const parsedDuplicate = parseRegisterResult(duplicateResult.value.data);
        payload = parsedDuplicate.payload || { success: false, error: 'Email ya registrado', statusCode: 409 };
        payloadStatusCode = 409;
      } else {
        const successResult = webhookResults.find(result => {
          if (result.status !== 'fulfilled' || !result.value) return false;
          const parsed = parseRegisterResult(result.value.data);
          return parsed.success === true;
        });

        if (successResult && successResult.status === 'fulfilled') {
          const parsedSuccess = parseRegisterResult(successResult.value.data);
          payload = parsedSuccess.payload;
          payloadStatusCode = Number(parsedSuccess.statusCode || successResult.value.status || 0);
        } else {
          const failedResult = webhookResults.find(result => {
            return result.status === 'fulfilled' && result.value && result.value.data;
          });
          if (failedResult && failedResult.status === 'fulfilled') {
            const parsedFailed = parseRegisterResult(failedResult.value.data);
            payload = parsedFailed.payload;
            payloadStatusCode = Number(parsedFailed.statusCode || failedResult.value.status || 0);
          } else {
            payload = null;
            payloadStatusCode = 0;
          }
        }
      }
    } catch (_) {
      payload = null;
    }

    if (!payload || payload.success !== true) {
      const statusCode = Number(payloadStatusCode || payload && payload.statusCode || 0);
      const backendMessage = payload && (payload.error || payload.message);
      if (statusCode === 409) {
        alert((backendMessage || 'Email ya registrado') + '. Inicia sesión con tu cuenta.');
        STATE.currentUser = null;
        localStorage.removeItem('currentUser');
        if (ELEMENTS.registerPanel && ELEMENTS.loginPanel) {
          ELEMENTS.registerPanel.style.display = 'none';
          ELEMENTS.loginPanel.style.display = 'block';
        }
        if ($('loginEmail')) $('loginEmail').value = normalizedEmail;
        if ($('loginPassword')) $('loginPassword').focus();
        updateAuthUI();
      } else {
        alert(backendMessage || 'Error al registrar usuario');
      }
      return false;
    }

    const createdAt = payload.createdAt || payload.created_at || profileSeed.created_at;
    // Almacenamos un hash no-reversible de la contraseña para login local fallback.
    // NUNCA se guarda la contraseña en texto plano.
    const passwordHash = hashText(normalizedPassword || password);
    const newUser = {
      username: normalizedUsername,
      email: normalizedEmail,
      passwordHash,
      createdAt: createdAt,
      n8nUserId: payload.userId || payload.id || null,
      testsStarted: profileSeed.tests_started,
      restarts: profileSeed.restarts,
      totalXp: profileSeed.total_xp,
      arenaTrophies: profileSeed.arena_trophies,
      arenaName: profileSeed.arena_name,
      leaguePoints: profileSeed.league_points,
      leagueLabel: profileSeed.league_label,
      avgWpm: profileSeed.avg_wpm,
      bestWpm: profileSeed.best_wpm,
      totalTests: profileSeed.total_tests,
      appVersion: profileSeed.app_version,
      tests: []
    };

    users[normalizedEmail] = newUser;
    localStorage.setItem('users', JSON.stringify(users));

    STATE.currentUser = {
      email: newUser.email,
      username: newUser.username,
      createdAt: newUser.createdAt,
      n8nUserId: newUser.n8nUserId
    };
    localStorage.setItem('currentUser', JSON.stringify(STATE.currentUser));
    updateAuthUI();
    showToast('Cuenta creada. Bienvenido, ' + normalizedUsername + '!', 'ok');

    // Se mantiene para compatibilidad con el flujo actual de login local.
    loginUserByEmail(email, password);
    return true;
  }

  function loginUserLocal(email, password, showAlert) {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const user = users[email];
    // Comparar contra passwordHash (nunca se almacena contraseña en texto plano)
    const inputHash = hashText(password);
    const legacyMatch = user && user.password === password; // compatibilidad con datos antiguos
    const hashMatch = user && user.passwordHash === inputHash;
    if (!user || (!hashMatch && !legacyMatch)) {
      if (showAlert) alert('Email o contraseña incorrectos');
      return false;
    }
    // Si tenía contraseña legacy en texto plano, migrar a hash ahora
    if (legacyMatch && !hashMatch) {
      user.passwordHash = inputHash;
      delete user.password;
      users[email] = user;
      localStorage.setItem('users', JSON.stringify(users));
    }
    STATE.currentUser = {
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      n8nUserId: user.n8nUserId || null
    };
    localStorage.setItem('currentUser', JSON.stringify(STATE.currentUser));
    updateAuthUI();
    return true;
  }

  async function loginUser(email, password) {
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const normalizedPassword = String(password || '');
    if (!normalizedEmail || !normalizedPassword) {
      alert('Email y contraseña son obligatorios');
      return false;
    }

    const normalizePayload = data => {
      if (data === null || data === undefined) return null;
      let current = data;
      for (let i = 0; i < 3 && typeof current === 'string'; i++) {
        try {
          current = JSON.parse(current);
        } catch (_) {
          return { raw: current };
        }
      }
      if (Array.isArray(current)) return current[0] || null;
      return current;
    };

    const parseLoginResult = data => {
      const normalized = normalizePayload(data);
      if (!normalized) return { payload: null, success: false, statusCode: 0, message: '' };
      const nested = normalizePayload(normalized.data);
      const payload = nested && typeof nested === 'object' ? nested : normalized;
      const statusCode = Number(payload.statusCode || normalized.statusCode || 0);
      const success = payload.success === true || (normalized.success === true && payload.success !== false);
      const message = String(payload.error || payload.message || normalized.error || normalized.message || '');
      return { payload, success, statusCode, message };
    };

    let parsedLogin = null;
    try {
      const results = await Promise.allSettled(
        LOGIN_WEBHOOK_URLS.map(async url => {
          try {
            const response = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: normalizedEmail, password: normalizedPassword })
            });
            const parsed = await parseWebhookResponse(response);
            return { status: response.status, data: parsed };
          } catch (_) {
            return { status: 0, data: null };
          }
        })
      );

      const successResult = results.find(result => {
        if (result.status !== 'fulfilled' || !result.value) return false;
        const parsed = parseLoginResult(result.value.data);
        return parsed.success === true;
      });

      if (successResult && successResult.status === 'fulfilled') {
        parsedLogin = parseLoginResult(successResult.value.data);
      } else {
        const failedResult = results.find(result => result.status === 'fulfilled' && result.value && result.value.data);
        parsedLogin = failedResult && failedResult.status === 'fulfilled'
          ? parseLoginResult(failedResult.value.data)
          : null;
      }
    } catch (_) {
      parsedLogin = null;
    }

    if (parsedLogin && parsedLogin.success === true && parsedLogin.payload) {
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      const previous = users[normalizedEmail] || {};
      const payload = parsedLogin.payload;
      const localUser = {
        username: payload.username || previous.username || normalizedEmail.split('@')[0],
        email: payload.email || previous.email || normalizedEmail,
        // No almacenar contraseña en texto plano; guardar hash para login local fallback
        passwordHash: previous.passwordHash || hashText(normalizedPassword),
        createdAt: payload.createdAt || payload.created_at || previous.createdAt || new Date().toISOString(),
        n8nUserId: payload.userId || payload.id || previous.n8nUserId || null,
        testsStarted: previous.testsStarted || 0,
        restarts: previous.restarts || 0,
        totalXp: previous.totalXp || 0,
        arenaTrophies: previous.arenaTrophies || 0,
        arenaName: previous.arenaName || 'Bronce',
        leaguePoints: previous.leaguePoints || 0,
        leagueLabel: previous.leagueLabel || 'Bronce I',
        avgWpm: previous.avgWpm || 0,
        bestWpm: previous.bestWpm || 0,
        totalTests: previous.totalTests || 0,
        appVersion: previous.appVersion || '1.0',
        tests: Array.isArray(previous.tests) ? previous.tests : []
      };

      users[normalizedEmail] = localUser;
      localStorage.setItem('users', JSON.stringify(users));

      STATE.currentUser = {
        email: localUser.email,
        username: localUser.username,
        createdAt: localUser.createdAt,
        n8nUserId: localUser.n8nUserId,
        // Guardar token y expiración para re-autenticación futura
        token: payload.token || null,
        tokenExpires: payload.tokenExpires || null
      };
      localStorage.setItem('currentUser', JSON.stringify(STATE.currentUser));
      updateAuthUI();
      showToast('Bienvenido, ' + localUser.username + '!', 'ok');
      return true;
    }

    // Fallback local para no romper acceso durante pruebas de backend.
    if (loginUserLocal(normalizedEmail, normalizedPassword, false)) return true;

    const loginError = parsedLogin && parsedLogin.message ? parsedLogin.message : 'Email o contraseña incorrectos';
    alert(loginError);
    return false;
  }

  function hashText(input) {
    const text = String(input || '');
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash) + text.charCodeAt(i);
      hash |= 0;
    }
    return 'h' + Math.abs(hash).toString(16);
  }

  function getCurrentRemoteUserId() {
    if (STATE.currentUser && STATE.currentUser.n8nUserId) return STATE.currentUser.n8nUserId;
    if (!STATE.currentUser || !STATE.currentUser.email) return null;
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const user = users[STATE.currentUser.email];
    if (user && user.n8nUserId) {
      STATE.currentUser.n8nUserId = user.n8nUserId;
      localStorage.setItem('currentUser', JSON.stringify(STATE.currentUser));
      return user.n8nUserId;
    }
    return STATE.currentUser.email;
  }

  async function parseWebhookResponse(response) {
    const raw = await response.text();
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (_) {
      return { raw: raw };
    }
  }

  async function sendTestResultToWebhooks(testRecord) {
    const userId = getCurrentRemoteUserId();
    if (!userId) {
      console.warn('Test sin userId remoto; no se envía webhook');
      return;
    }

    const requestBody = {
      userId: userId,
      mode: testRecord.mode || 'solo',
      versusOutcome: testRecord.versusOutcome || null,
      wpm: Number(testRecord.wpm || 0),
      rawWpm: Number(testRecord.rawWpm || testRecord.wpm || 0),
      acc: Number(testRecord.acc || 0),
      consistency: Number(testRecord.consistency || 0),
      correctChars: Number(testRecord.charsCorrect || 0),
      incorrectChars: Number(testRecord.charsIncorrect || 0),
      charsCorrect: Number(testRecord.charsCorrect || 0),
      charsIncorrect: Number(testRecord.charsIncorrect || 0),
      timeSeconds: Number(testRecord.time || 0),
      type: testRecord.type || 'words',
      duration: Number(testRecord.duration || 0),
      wordCount: Number(testRecord.wordCount || 0),
      language: testRecord.language || STATE.currentLanguage,
      difficulty: testRecord.difficulty || STATE.currentDifficulty,
      botDifficulty: testRecord.botDifficulty || null,
      punctuation: testRecord.punctuation || 'off',
      numbers: testRecord.numbers || 'off',
      tags: Array.isArray(testRecord.tags) ? testRecord.tags : [],
      textId: testRecord.textId || [testRecord.type || 'words', testRecord.language || 'es', testRecord.difficulty || '1k'].join('-'),
      textHash: testRecord.textHash || hashText(testRecord.textSource || ''),
      replay: testRecord.replay || {
        timeline: Array.isArray(testRecord.wpmHistory) ? testRecord.wpmHistory : [],
        meta: {
          savedAt: testRecord.date,
          mode: testRecord.mode || 'solo',
          source: 'typehub-web'
        }
      },
      appVersion: testRecord.appVersion || '1.0'
    };

    const normalizePayload = data => {
      if (data === null || data === undefined) return null;
      let current = data;
      for (let i = 0; i < 3 && typeof current === 'string'; i++) {
        try {
          current = JSON.parse(current);
        } catch (_) {
          return { raw: current };
        }
      }
      if (Array.isArray(current)) return current[0] || null;
      return current;
    };

    const parseTestWebhookResult = data => {
      const normalized = normalizePayload(data);
      if (!normalized) return { success: false, statusCode: 0, payload: null };
      const nested = normalizePayload(normalized.data);
      const payload = nested && typeof nested === 'object' ? nested : normalized;
      const statusCode = Number(payload.statusCode || normalized.statusCode || 0);
      const success = payload.success === true || (statusCode >= 200 && statusCode < 300 && !!payload.testId);
      return { success, statusCode, payload };
    };

    try {
      const results = await Promise.allSettled(
        TEST_WEBHOOK_URLS.map(async url => {
          try {
            const response = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(requestBody)
            });
            const parsed = await parseWebhookResponse(response);
            return { ok: response.ok, status: response.status, data: parsed };
          } catch (_) {
            return { ok: false, status: 0, data: null };
          }
        })
      );

      const hasSuccess = results.some(result => {
        if (result.status !== 'fulfilled' || !result.value) return false;
        const parsed = parseTestWebhookResult(result.value.data);
        if (parsed.success) return true;
        return result.value.ok && result.value.status >= 200 && result.value.status < 300;
      });

      if (!hasSuccess) {
        console.warn('No se pudo confirmar guardado remoto del test', results);
      }
    } catch (_) {
      console.warn('Error enviando test a webhooks');
    }
  }

  function loginUserByEmail(email, password) {
    const normalizedEmail = String(email || '').trim().toLowerCase();
    loginUserLocal(normalizedEmail, password, false);
  }

  function logoutUser() {
    STATE.currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
  }

  function updateAuthUI() {
    const isLoggedIn = STATE.currentUser !== null;
    // Login section panels
    if (ELEMENTS.registerPanel) ELEMENTS.registerPanel.style.display = isLoggedIn ? 'none' : 'block';
    if (ELEMENTS.loginPanel)    ELEMENTS.loginPanel.style.display    = isLoggedIn ? 'none' : 'block';
    if (ELEMENTS.profilePanel)  ELEMENTS.profilePanel.style.display  = isLoggedIn ? 'block' : 'none';

    // Header nav pill ↔ login button
    if (ELEMENTS.navLoginBtn) ELEMENTS.navLoginBtn.style.display  = isLoggedIn ? 'none' : '';
    if (ELEMENTS.navUserPill) ELEMENTS.navUserPill.style.display  = isLoggedIn ? '' : 'none';
    if (isLoggedIn && STATE.currentUser) {
      const u = STATE.currentUser;
      const letter = (u.username || u.email || '?').charAt(0).toUpperCase();
      if (ELEMENTS.navAvatarLetter) ELEMENTS.navAvatarLetter.textContent = letter;
      if (ELEMENTS.navUsername)     ELEMENTS.navUsername.textContent = u.username || u.email || 'usuario';
    }

    syncVersusNamesAndRanks();
    showVersusLoginHintIfNeeded();
    if (isLoggedIn) {
      displayProfile();
      void syncRemoteProfile();
    }
    initCompetitiveUI();
  }

  function setReloadProfileStatus(message, kind) {
    if (!ELEMENTS.reloadProfileStatus) return;
    ELEMENTS.reloadProfileStatus.textContent = message || '';
    ELEMENTS.reloadProfileStatus.classList.remove('ok', 'err');
    if (kind === 'ok') ELEMENTS.reloadProfileStatus.classList.add('ok');
    if (kind === 'err') ELEMENTS.reloadProfileStatus.classList.add('err');
  }

  function setProfileSyncMeta(message) {
    if (!ELEMENTS.profileSyncMeta) return;
    ELEMENTS.profileSyncMeta.textContent = message || '';
  }

  function setProfileSyncDebug(value) {
    if (!ELEMENTS.profileSyncDebug) return;
    ELEMENTS.profileSyncDebug.textContent = value || '';
  }

  function setReloadLeaderboardStatus(message, kind) {
    if (!ELEMENTS.reloadLeaderboardStatus) return;
    ELEMENTS.reloadLeaderboardStatus.textContent = message || '';
    ELEMENTS.reloadLeaderboardStatus.classList.remove('ok', 'err');
    if (kind === 'ok') ELEMENTS.reloadLeaderboardStatus.classList.add('ok');
    if (kind === 'err') ELEMENTS.reloadLeaderboardStatus.classList.add('err');
  }

  function setLeaderboardSyncMeta(message) {
    if (!ELEMENTS.leaderboardSyncMeta) return;
    ELEMENTS.leaderboardSyncMeta.textContent = message || '';
  }

  function setLeaderboardSyncDebug(value) {
    // Send to console only — don't show raw debug info in the UI
    if (value) console.debug('[TypeHub] leaderboard sync:', value);
    if (!ELEMENTS.leaderboardSyncDebug) return;
    ELEMENTS.leaderboardSyncDebug.textContent = ''; // always clear visible debug
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatLeaderboardDate(value) {
    if (!value) return '-';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  function renderLeaderboardTable(entries) {
    if (!ELEMENTS.leaderboardTableBody) return;

    if (!Array.isArray(entries) || entries.length === 0) {
      ELEMENTS.leaderboardTableBody.innerHTML =
        '<tr><td colspan="8" style="text-align:center;color:var(--text-sub);padding:1.5rem;">Sin datos disponibles. Pulsa "Recargar" para cargar datos remotos.</td></tr>';
      return;
    }

    const medals = ['🥇', '🥈', '🥉'];
    ELEMENTS.leaderboardTableBody.innerHTML = entries.map((entry, idx) => {
      const username    = escapeHtml(entry.username || 'anon');
      const bestWpm     = Number(entry.best_wpm    ?? entry.bestWpm    ?? 0);
      const avgWpm      = Number(entry.avg_wpm     ?? entry.avgWpm     ?? 0);
      const totalXp     = Number(entry.total_xp    ?? entry.totalXp    ?? 0);
      const totalTests  = Number(entry.total_tests ?? entry.totalTests ?? 0);
      const arenaName   = escapeHtml(entry.arena_name  ?? entry.arenaName  ?? '—');
      const streakDays  = Number(entry.streak_days ?? entry.streakDays ?? 0);
      const leagueLabel = escapeHtml(entry.league_label ?? entry.leagueLabel ?? '—');
      const rank = (medals[idx] || '') + ' ' + (idx + 1);

      return '<tr>' +
        '<td style="color:var(--text-sub);font-weight:700;">' + rank + '</td>' +
        '<td style="color:var(--text);font-weight:600;">' + username + '</td>' +
        '<td class="wpm-cell">' + (Number.isFinite(bestWpm) ? Math.round(bestWpm) : 0) + '</td>' +
        '<td style="color:var(--text-sub);">' + (Number.isFinite(avgWpm) ? Math.round(avgWpm) : 0) + '</td>' +
        '<td style="color:var(--accent);">' + (Number.isFinite(totalXp) ? totalXp.toLocaleString('es-ES') : '0') + '</td>' +
        '<td>' + arenaName + '</td>' +
        '<td>' + leagueLabel + '</td>' +
        '<td>' + (streakDays > 0 ? '🔥 ' + streakDays + 'd' : '—') + '</td>' +
        '</tr>';
    }).join('');
  }

  function normalizeLeaderboardPayload(data) {
    if (data === null || data === undefined) return null;
    let current = data;
    for (let i = 0; i < 3 && typeof current === 'string'; i++) {
      try {
        current = JSON.parse(current);
      } catch (_) {
        return { raw: current };
      }
    }
    return current;
  }

  function parseLeaderboardResult(data) {
    let normalized = normalizeLeaderboardPayload(data);
    if (!normalized) return { success: false, statusCode: 0, entries: [], payload: null };

    if (Array.isArray(normalized)) {
      const looksLikeRows = normalized.length > 0 && normalized.every(item => item && typeof item === 'object' && ('username' in item || 'best_wpm' in item || 'bestWpm' in item));
      if (looksLikeRows) {
        return { success: true, statusCode: 200, entries: normalized, payload: { leaderboard: normalized } };
      }
      normalized = normalized[0] || null;
      if (!normalized) return { success: false, statusCode: 0, entries: [], payload: null };
    }

    const nested = normalizeLeaderboardPayload(normalized.data);
    const payload = nested && typeof nested === 'object' ? nested : normalized;

    let entries = payload.leaderboard;
    if (!Array.isArray(entries) && Array.isArray(payload.rows)) entries = payload.rows;
    if (!Array.isArray(entries) && Array.isArray(payload.data)) entries = payload.data;
    if (!Array.isArray(entries) && Array.isArray(normalized.leaderboard)) entries = normalized.leaderboard;
    if (!Array.isArray(entries) && Array.isArray(normalized.rows)) entries = normalized.rows;
    if (!Array.isArray(entries) && Array.isArray(normalized.data)) entries = normalized.data;
    if (!Array.isArray(entries)) entries = [];

    const statusCode = Number(payload.statusCode || normalized.statusCode || 0);
    const explicitSuccess = payload.success === true || normalized.success === true;
    const success = explicitSuccess || ((statusCode >= 200 && statusCode < 300) && Array.isArray(entries));

    return { success, statusCode, entries, payload };
  }

  async function syncRemoteLeaderboard(options) {
    const opts = options || {};
    const limit = Number(opts.limit || 20);
    const selectedBaseUrls = getLeaderboardWebhookUrls();

    if (leaderboardSyncInFlight) return { ok: false, reason: 'in-flight' };
    leaderboardSyncInFlight = true;

    try {
      if (isNullOriginRuntime()) {
        if (opts.allowNullOriginPing) {
          setLeaderboardSyncDebug('sync leaderboard: file:// ping-only | limit=' + limit + ' | targets=' + selectedBaseUrls.join(', '));
          await Promise.allSettled(
            selectedBaseUrls.map(async baseUrl => {
              const url = baseUrl + '?limit=' + encodeURIComponent(String(limit));
              try {
                await fetch(url, { method: 'GET', mode: 'no-cors' });
              } catch (_) {
                // Ignorado: en file:// no podremos leer respuesta
              }
            })
          );
          return { ok: true, reason: 'ping-only' };
        }
        return { ok: false, reason: 'null-origin' };
      }

      const results = await Promise.allSettled(
        selectedBaseUrls.map(async baseUrl => {
          const url = baseUrl + '?limit=' + encodeURIComponent(String(limit));
          const response = await fetch(url, { method: 'GET' });
          const data = await parseWebhookResponse(response);
          return { ok: response.ok, status: response.status, data: data, url: url };
        })
      );

      const debugLines = results.map(result => {
        if (result.status !== 'fulfilled' || !result.value) return 'result: rejected';
        const parsed = parseLeaderboardResult(result.value.data);
        return 'url=' + (result.value.url || '-') +
          ' | http=' + Number(result.value.status || 0) +
          ' | success=' + String(parsed.success) +
          ' | entries=' + Number(parsed.entries.length || 0) +
          ' | statusCode=' + Number(parsed.statusCode || 0);
      });
      setLeaderboardSyncDebug(debugLines.join('\n'));

      const successResult = results.find(result => {
        if (result.status !== 'fulfilled' || !result.value) return false;
        const parsed = parseLeaderboardResult(result.value.data);
        if (parsed.success && Array.isArray(parsed.entries)) return true;
        return result.value.ok;
      });

      if (!successResult || successResult.status !== 'fulfilled') {
        const fulfilled = results.filter(result => result.status === 'fulfilled' && !!result.value);
        const all404 = fulfilled.length > 0 && fulfilled.every(result => Number(result.value.status || 0) === 404);
        if (all404) {
          return { ok: false, reason: 'endpoint-404' };
        }
        const all5xx = fulfilled.length > 0 && fulfilled.every(result => {
          const status = Number(result.value.status || 0);
          return status >= 500;
        });
        if (all5xx) {
          return { ok: false, reason: 'backend-5xx' };
        }
        const allRejected = results.length > 0 && results.every(result => result.status === 'rejected');
        if (allRejected) {
          return { ok: false, reason: 'network-or-cors' };
        }
        return { ok: false, reason: 'no-success-response' };
      }

      const parsed = parseLeaderboardResult(successResult.value.data);
      const entries = Array.isArray(parsed.entries) ? parsed.entries : [];
      renderLeaderboardTable(entries);

      const syncedAt = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const usedUrl = successResult.value && successResult.value.url ? successResult.value.url : '';
      setLeaderboardSyncMeta('Actualizado desde n8n · ' + syncedAt + (usedUrl ? (' · ' + usedUrl) : ''));
      return { ok: true, reason: 'synced', entries: entries, sourceUrl: usedUrl };
    } catch (_) {
      setLeaderboardSyncDebug('sync leaderboard: exception no controlada');
      return { ok: false, reason: 'exception' };
    } finally {
      leaderboardSyncInFlight = false;
    }
  }

  async function syncRemoteProfile(options) {
    const opts = options || {};
    if (!STATE.currentUser) return { ok: false, reason: 'no-user' };
    if (profileSyncInFlight) return { ok: false, reason: 'in-flight' };
    if (Date.now() < profileSyncRetryAfter) return { ok: false, reason: 'retry-later' };

    const buildProfileCandidateUrls = (baseUrl, userId) => {
      const encoded = encodeURIComponent(userId);
      const candidates = [
        baseUrl + '/' + encoded + '?userId=' + encoded,
        baseUrl + '/{userId}?userId=' + encoded,
        baseUrl + '/' + encoded,
        baseUrl + '?userId=' + encoded
      ];
      return [...new Set(candidates)];
    };

    const fetchProfileWithFallback = async (baseUrl, userId) => {
      const candidates = buildProfileCandidateUrls(baseUrl, userId);
      let last = { status: 0, data: null, url: candidates[0] };
      for (const url of candidates) {
        try {
          const response = await fetch(url, {
            method: 'GET'
          });
          const data = await parseWebhookResponse(response);
          const item = { status: response.status, data: data, url: url };
          last = item;

          const payloadText = JSON.stringify(data || '').toLowerCase();
          const missingUserId = payloadText.includes('userid requerido');
          if (response.ok && !missingUserId) return item;

          // Si falla una variante (404, 500, validación), intentamos la siguiente.
          continue;
        } catch (_) {
          last = { status: 0, data: null, url: url };
        }
      }
      return last;
    };

    if (isNullOriginRuntime()) {
      const userIdForPing = getCurrentRemoteUserId();
      if (opts.allowNullOriginPing && userIdForPing) {
        console.debug('[TypeHub] syncRemoteProfile: file:// ping-only | userId=' + userIdForPing);
        await Promise.allSettled(
          PROFILE_WEBHOOK_BASE_URLS.map(async baseUrl => {
            const candidates = buildProfileCandidateUrls(baseUrl, userIdForPing);
            for (const url of candidates) {
              try {
                await fetch(url, { method: 'GET', mode: 'no-cors' });
              } catch (_) {
                // Ignorado: en file:// solo queremos intentar disparar el webhook.
              }
            }
          })
        );
        return { ok: true, reason: 'ping-only' };
      }
      if (!warnedNullOrigin) {
        console.warn('Profile sync remoto desactivado: origen null/file detectado. Usa http://localhost para pruebas con webhooks.');
        warnedNullOrigin = true;
      }
      return { ok: false, reason: 'null-origin' };
    }
    const userId = getCurrentRemoteUserId();
    if (!userId) return { ok: false, reason: 'no-user-id' };

    profileSyncInFlight = true;

    const normalizePayload = data => {
      if (data === null || data === undefined) return null;
      let current = data;
      for (let i = 0; i < 3 && typeof current === 'string'; i++) {
        try {
          current = JSON.parse(current);
        } catch (_) {
          return { raw: current };
        }
      }
      if (Array.isArray(current)) return current[0] || null;
      return current;
    };

    const parseProfileResult = data => {
      const normalized = normalizePayload(data);
      if (!normalized) return { success: false, statusCode: 0, payload: null };
      const nested = normalizePayload(normalized.data);
      const payload = nested && typeof nested === 'object' ? nested : normalized;
      const statusCode = Number(payload.statusCode || normalized.statusCode || 0);
      return {
        success: payload.success === true,
        statusCode: statusCode,
        payload: payload
      };
    };

    try {
      const results = await Promise.allSettled(
        PROFILE_WEBHOOK_BASE_URLS.map(async baseUrl => fetchProfileWithFallback(baseUrl, userId))
      );

      const debugLines = results.map(result => {
        if (result.status !== 'fulfilled' || !result.value) return 'result: rejected';
        const parsed = parseProfileResult(result.value.data);
        return 'url=' + (result.value.url || '-') +
          ' | http=' + Number(result.value.status || 0) +
          ' | success=' + String(parsed.success) +
          ' | statusCode=' + Number(parsed.statusCode || 0);
      });
      // Keep debug info in console only — not visible to users
      console.debug('[TypeHub] syncRemoteProfile debug:', debugLines.join(' | '));
      setProfileSyncDebug('');

      const successResult = results.find(result => {
        if (result.status !== 'fulfilled' || !result.value) return false;
        const parsed = parseProfileResult(result.value.data);
        return parsed.success === true;
      });

      const all404 = results.length > 0 && results.every(result => {
        return result.status === 'fulfilled' && result.value && Number(result.value.status || 0) === 404;
      });
      if (all404) {
        profileSyncRetryAfter = Date.now() + 60000;
        return { ok: false, reason: 'endpoint-404' };
      }

      const fulfilled = results.filter(result => result.status === 'fulfilled' && !!result.value);
      const all5xx = fulfilled.length > 0 && fulfilled.every(result => {
        const status = Number(result.value.status || 0);
        return status >= 500;
      });
      if (all5xx) return { ok: false, reason: 'backend-5xx' };

      const allRejected = results.length > 0 && results.every(result => result.status === 'rejected');
      if (allRejected) return { ok: false, reason: 'network-or-cors' };

      if (!successResult || successResult.status !== 'fulfilled') return { ok: false, reason: 'no-success-response' };

      const parsed = parseProfileResult(successResult.value.data);
      if (!parsed.success || !parsed.payload || !parsed.payload.user) return { ok: false, reason: 'bad-payload' };

      const remoteUser = parsed.payload.user;
      // Validar estructura del usuario remoto antes de procesar
      if (!validateApiUser(remoteUser)) {
        console.error('[TypeHub] syncRemoteProfile: remoteUser inválido', remoteUser);
        return { ok: false, reason: 'invalid-remote-user' };
      }
      const recentTests = Array.isArray(parsed.payload.recentTests) ? parsed.payload.recentTests : [];

      const users = JSON.parse(localStorage.getItem('users') || '{}');
      const currentEmail = STATE.currentUser.email;
      const local = users[currentEmail] || {};

      const mappedRecentTests = recentTests.map(t => ({
        wpm: Number(t.wpm || 0),
        rawWpm: Number(t.raw_wpm || t.rawWpm || 0),
        acc: Number(t.acc || 0),
        consistency: 100,
        chars: 0,
        charsCorrect: 0,
        charsIncorrect: 0,
        time: Number(t.time_seconds || t.timeSeconds || 0),
        type: 'words',
        mode: t.mode || 'solo',
        versusOutcome: null,
        duration: 0,
        wordCount: 0,
        language: t.language || 'es',
        difficulty: t.difficulty || '1k',
        botDifficulty: null,
        punctuation: 'off',
        numbers: 'off',
        tags: [],
        date: t.created_at || new Date().toISOString()
      }));

      const nextEmail = String(remoteUser.email || local.email || currentEmail).toLowerCase();
      const mergedUser = {
        ...local,
        username: remoteUser.username || local.username || STATE.currentUser.username,
        email: nextEmail,
        createdAt: remoteUser.createdAt || remoteUser.created_at || local.createdAt || STATE.currentUser.createdAt,
        n8nUserId: remoteUser.id || local.n8nUserId || STATE.currentUser.n8nUserId,
        totalTests: Number(remoteUser.totalTests || remoteUser.total_tests || local.totalTests || 0),
        totalXp: Number(remoteUser.totalXp || remoteUser.total_xp || local.totalXp || 0),
        bestWpm: Number(remoteUser.bestWpm || remoteUser.best_wpm || local.bestWpm || 0),
        tests: mappedRecentTests.length ? mappedRecentTests : (Array.isArray(local.tests) ? local.tests : [])
      };

      if (nextEmail !== currentEmail) {
        delete users[currentEmail];
      }
      users[nextEmail] = mergedUser;
      localStorage.setItem('users', JSON.stringify(users));

      STATE.currentUser = {
        email: nextEmail,
        username: mergedUser.username,
        createdAt: mergedUser.createdAt,
        n8nUserId: mergedUser.n8nUserId
      };
      localStorage.setItem('currentUser', JSON.stringify(STATE.currentUser));
      const syncedAt = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const usedUrl = successResult.value && successResult.value.url ? successResult.value.url : '';
      setProfileSyncMeta('Actualizado desde n8n · ' + syncedAt + (usedUrl ? (' · ' + usedUrl) : ''));
      // Clear debug on success — don't expose raw payload to the user
      setProfileSyncDebug('');
      displayProfile();
      return { ok: true, reason: 'synced', sourceUrl: usedUrl };
    } catch (_) {
      // Si falla el sync remoto, mantenemos perfil local sin bloquear la app.
      console.warn('[TypeHub] syncRemoteProfile: excepción no controlada');
      return { ok: false, reason: 'exception' };
    } finally {
      profileSyncInFlight = false;
    }
  }

  function displayProfile() {
    if (!STATE.currentUser) return;

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const userData = users[STATE.currentUser.email];
    if (!userData) return;

    const tests = userData.tests || [];
    const stats = calculateStats(tests, userData);

    const joined = new Date(userData.createdAt);
    const daysAgo = Math.max(0, Math.floor((Date.now() - joined.getTime()) / (1000 * 60 * 60 * 24)));

    ELEMENTS.profileUsername.textContent = userData.username;
    ELEMENTS.profileEmail.textContent = userData.email;
    ELEMENTS.profileDate.textContent = 'Joined ' + joined.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    if (ELEMENTS.profileDaysAgo) ELEMENTS.profileDaysAgo.textContent = daysAgo + ' days ago';

    if (ELEMENTS.profileLevel) ELEMENTS.profileLevel.textContent = String(stats.level);
    if (ELEMENTS.profileTotalXp) ELEMENTS.profileTotalXp.textContent = stats.totalXp.toLocaleString() + ' total xp';
    if (ELEMENTS.profileNextPct) ELEMENTS.profileNextPct.textContent = stats.nextLevelPct.toFixed(2) + '%';
    if (ELEMENTS.profileXpUntil) {
      ELEMENTS.profileXpUntil.textContent = stats.level + ' / 1000 ' + stats.xpUntilNext.toLocaleString() + ' xp until next level';
    }

    if (ELEMENTS.statTestsStarted) ELEMENTS.statTestsStarted.textContent = stats.testsStarted.toLocaleString();
    if (ELEMENTS.statTestsCompleted) {
      ELEMENTS.statTestsCompleted.textContent = stats.totalTests.toLocaleString() + ' (' + stats.completedPct.toFixed(0) + '%)';
    }
    if (ELEMENTS.statRestarts) ELEMENTS.statRestarts.textContent = stats.restartsPerCompleted.toFixed(1) + ' restarts per completed test';
    if (ELEMENTS.statTotalTime) ELEMENTS.statTotalTime.textContent = formatHms(stats.totalTime);
    if (ELEMENTS.versusDuelsPlayed) ELEMENTS.versusDuelsPlayed.textContent = String(stats.versusDuelsPlayed);
    if (ELEMENTS.versusWinRate) ELEMENTS.versusWinRate.textContent = stats.versusWinRate.toFixed(1) + '%';
    if (ELEMENTS.versusBestWpm) ELEMENTS.versusBestWpm.textContent = String(Math.round(stats.versusBestWpm));
    if (ELEMENTS.versusBotPlayed) ELEMENTS.versusBotPlayed.textContent = String(stats.versusBotPlayed);
    if (ELEMENTS.versusOnlinePlayed) ELEMENTS.versusOnlinePlayed.textContent = String(stats.versusOnlinePlayed);
    if (ELEMENTS.versusOnlineWinRate) ELEMENTS.versusOnlineWinRate.textContent = stats.versusOnlineWinRate.toFixed(1) + '%';

    renderPersonalBests(tests);

    // Show/hide data-dependent blocks
    const hasTests = tests.length > 0;
    const pbsBlock     = document.getElementById('profilePbsBlock');
    const filtersBlock = document.getElementById('profileFiltersBlock');
    if (pbsBlock)     pbsBlock.classList.toggle('profile-block--empty', !hasTests);
    if (filtersBlock) filtersBlock.classList.toggle('profile-block--empty', !hasTests);

    const range = ELEMENTS.activityRangeSelect ? ELEMENTS.activityRangeSelect.value : '12months';
    const testsInRange = applyAdvancedFilters(getTestsInRange(tests, range));
    renderActivityByDay(testsInRange, range);
    renderRangeSummary(testsInRange, stats);
    drawProfileTrendChart(testsInRange, STATE.profileMetricMode);
    displayTestsHistory(testsInRange);
    initCompetitiveUI();
  }

  function calculateStats(tests, userData) {
    const remoteTotalTests = Number(userData && (userData.totalTests ?? userData.total_tests) || 0);
    const remoteTotalXp = Number(userData && (userData.totalXp ?? userData.total_xp) || 0);
    const remoteBestWpm = Number(userData && (userData.bestWpm ?? userData.best_wpm) || 0);

    if (!tests || tests.length === 0) {
      const testsStartedNoLocal = userData && typeof userData.testsStarted === 'number'
        ? Math.max(userData.testsStarted, remoteTotalTests)
        : remoteTotalTests;
      const completedPctNoLocal = testsStartedNoLocal > 0 ? (remoteTotalTests / testsStartedNoLocal) * 100 : 0;
      const levelNoLocal = Math.floor(remoteTotalXp / 500) + 1;
      const xpInLevelNoLocal = remoteTotalXp % 500;
      return {
        totalTests: remoteTotalTests,
        totalTime: 0,
        testsStarted: testsStartedNoLocal,
        completedPct: completedPctNoLocal,
        restartsPerCompleted: 0,
        totalXp: remoteTotalXp,
        level: levelNoLocal,
        xpUntilNext: 500 - xpInLevelNoLocal,
        nextLevelPct: (xpInLevelNoLocal / 500) * 100,
        versusDuelsPlayed: 0,
        versusBotPlayed: 0,
        versusOnlinePlayed: 0,
        versusWins: 0,
        versusWinRate: 0,
        versusOnlineWinRate: 0,
        versusBestWpm: remoteBestWpm
      };
    }

    let totalTime = 0;
    let totalXp = 0;

    tests.forEach(test => {
      totalTime += Number(test.time || 0);
      totalXp += Math.max(10, Math.round((Number(test.wpm || 0) * 2) + Number(test.acc || 0)));
    });

    const resolvedTotalTests = Math.max(tests.length, remoteTotalTests);
    const resolvedTotalXp = Math.max(totalXp, remoteTotalXp);

    const testsStarted = userData && typeof userData.testsStarted === 'number'
      ? Math.max(userData.testsStarted, resolvedTotalTests)
      : resolvedTotalTests;
    const restarts = userData && typeof userData.restarts === 'number' ? userData.restarts : 0;
    const completedPct = testsStarted > 0 ? (resolvedTotalTests / testsStarted) * 100 : 0;
    const level = Math.floor(resolvedTotalXp / 500) + 1;
    const xpInLevel = resolvedTotalXp % 500;
    const versusTests = tests.filter(t => String(t.mode || '').startsWith('versus-'));
    const versusBotTests = tests.filter(t => t.mode === 'versus-bot');
    const versusOnlineTests = tests.filter(t => t.mode === 'versus-online');
    const versusDuelsPlayed = versusTests.length;
    const versusWins = versusTests.filter(t => t.versusOutcome === 'win').length;
    const versusOnlineWins = versusOnlineTests.filter(t => t.versusOutcome === 'win').length;
    const versusBestWpm = versusTests.length ? Math.max(...versusTests.map(t => Number(t.wpm || 0))) : remoteBestWpm;

    return {
      totalTests: resolvedTotalTests,
      totalTime: totalTime,
      testsStarted: testsStarted,
      completedPct: completedPct,
      restartsPerCompleted: tests.length > 0 ? restarts / tests.length : 0,
      totalXp: resolvedTotalXp,
      level: level,
      xpUntilNext: 500 - xpInLevel,
      nextLevelPct: (xpInLevel / 500) * 100,
      versusDuelsPlayed: versusDuelsPlayed,
      versusBotPlayed: versusBotTests.length,
      versusOnlinePlayed: versusOnlineTests.length,
      versusWins: versusWins,
      versusWinRate: versusDuelsPlayed > 0 ? (versusWins / versusDuelsPlayed) * 100 : 0,
      versusOnlineWinRate: versusOnlineTests.length > 0 ? (versusOnlineWins / versusOnlineTests.length) * 100 : 0,
      versusBestWpm: versusBestWpm
    };
  }

  function displayTestsHistory(tests) {
    if (!tests || tests.length === 0) {
      ELEMENTS.testsHistory.innerHTML = '<p style="color: var(--text-light); text-align: center;">Sin tests registrados aún.</p>';
      return;
    }

    let html = '<div class="test-entry test-entry-header">' +
      '<div>wpm</div><div>raw</div><div>accuracy</div><div>consistency</div><div>mode</div><div>info</div><div>tags</div><div>date</div>' +
      '</div>';

    tests.slice().reverse().forEach(test => {
      const raw = Number(test.rawWpm || test.wpm || 0);
      const consistency = Number(test.consistency || 0);
      const modeLabel = test.mode === 'versus-bot'
        ? ('versus bot ' + (test.botDifficulty || 'medium'))
        : test.mode === 'versus-online'
          ? 'versus online'
        : (test.type === 'words' ? 'words ' + (test.wordCount || 50) : 'time ' + (test.duration || STATE.currentDuration));
      const info = 'lang ' + (test.language || STATE.currentLanguage) + ' diff ' + (test.difficulty || STATE.currentDifficulty);
      const tags = test.tags && test.tags.length ? test.tags.join(', ') : 'no tags';
      const date = new Date(test.date).toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
      });
      html += '<div class="test-entry">' +
        '<div><div class="test-entry-value">' + Number(test.wpm || 0).toFixed(2) + '</div></div>' +
        '<div><div class="test-entry-value">' + raw.toFixed(2) + '</div></div>' +
        '<div><div class="test-entry-value">' + Number(test.acc || 0).toFixed(2) + '%</div></div>' +
        '<div><div class="test-entry-value">' + consistency.toFixed(2) + '%</div></div>' +
        '<div><div class="test-entry-value">' + modeLabel + '</div></div>' +
        '<div><div class="test-entry-value">' + info + '</div></div>' +
        '<div><div class="test-entry-value">' + tags + '</div></div>' +
        '<div><div class="test-entry-value">' + date + '</div></div>' +
        '</div>';
    });

    ELEMENTS.testsHistory.innerHTML = html;
  }

  function formatHms(totalSeconds) {
    const s = Math.max(0, Math.floor(totalSeconds));
    const hh = String(Math.floor(s / 3600)).padStart(2, '0');
    const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    return hh + ':' + mm + ':' + ss;
  }

  function getTestsInRange(tests, range) {
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    let ms = 365 * day;
    if (range === 'day') ms = day;
    if (range === 'week') ms = 7 * day;
    if (range === 'month') ms = 30 * day;
    if (range === '3months') ms = 90 * day;
    if (range === 'all') ms = Number.MAX_SAFE_INTEGER;
    return tests.filter(test => (now - new Date(test.date).getTime()) <= ms);
  }

  function renderActivityByDay(tests, range) {
    if (!ELEMENTS.activityList) return;
    const now = new Date();
    const days = range === 'day' ? 1 : range === 'week' ? 7 : range === 'month' ? 30 : range === '3months' ? 90 : range === '12months' ? 365 : 365;
    const map = {};
    tests.forEach(test => {
      const d = new Date(test.date);
      const key = d.getUTCFullYear() + '-' + String(d.getUTCMonth() + 1).padStart(2, '0') + '-' + String(d.getUTCDate()).padStart(2, '0');
      map[key] = (map[key] || 0) + 1;
    });

    const rows = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now.getTime() - (i * 86400000));
      const key = d.getUTCFullYear() + '-' + String(d.getUTCMonth() + 1).padStart(2, '0') + '-' + String(d.getUTCDate()).padStart(2, '0');
      const pretty = formatActivityDateUTC(d);
      const count = map[key] || 0;
      rows.push('<div class="activity-item">' + (count ? (count + ' tests on ' + pretty) : ('no activity on ' + pretty)) + '</div>');
    }

    if (ELEMENTS.activityCountValue) ELEMENTS.activityCountValue.textContent = String(tests.length);
    ELEMENTS.activityList.innerHTML = rows.join('');
    ELEMENTS.activityList.style.display = STATE.activityExpanded ? 'grid' : 'none';
  }

  function renderPersonalBests(tests) {
    const empty = '- -';
    const getBest = arr => arr.length ? arr.reduce((a, b) => (Number(a.wpm || 0) > Number(b.wpm || 0) ? a : b)) : null;
    const by15 = getBest(tests.filter(t => Number(t.duration || 0) === 15));
    const by30 = getBest(tests.filter(t => Number(t.duration || 0) === 30));
    const by50 = getBest(tests.filter(t => t.type === 'words' && Number(t.wordCount || 50) === 50));
    const by100 = getBest(tests.filter(t => t.type === 'words' && Number(t.wordCount || 50) === 100));

    const fmtPb = t => t
      ? Number(t.wpm || 0) + ' wpm | ' + Number(t.rawWpm || t.wpm || 0) + ' raw | ' + Number(t.acc || 0).toFixed(0) + '% acc | ' + Number(t.consistency || 0).toFixed(0) + '% con'
      : empty;
    const fmtDate = t => t ? new Date(t.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-';

    if (ELEMENTS.pb15) ELEMENTS.pb15.textContent = fmtPb(by15);
    if (ELEMENTS.pb30) ELEMENTS.pb30.textContent = fmtPb(by30);
    if (ELEMENTS.pb50w) ELEMENTS.pb50w.textContent = fmtPb(by50);
    if (ELEMENTS.pb100w) ELEMENTS.pb100w.textContent = fmtPb(by100);
    if (ELEMENTS.pb15Date) ELEMENTS.pb15Date.textContent = fmtDate(by15);
    if (ELEMENTS.pb30Date) ELEMENTS.pb30Date.textContent = fmtDate(by30);
    if (ELEMENTS.pb50wDate) ELEMENTS.pb50wDate.textContent = fmtDate(by50);
    if (ELEMENTS.pb100wDate) ELEMENTS.pb100wDate.textContent = fmtDate(by100);
  }

  function renderRangeSummary(tests, globalStats) {
    const count = tests.length;
    const totalWords = tests.reduce((sum, t) => sum + Math.round(Number(t.chars || 0) / 5), 0);
    const totalTime = tests.reduce((sum, t) => sum + Number(t.time || 0), 0);
    const avg = (arr, field) => arr.length ? arr.reduce((s, t) => s + Number(t[field] || 0), 0) / arr.length : 0;
    const max = (arr, field) => arr.length ? Math.max(...arr.map(t => Number(t[field] || 0))) : 0;
    const last10 = tests.slice(-10);

    const avgWpm = avg(tests, 'wpm');
    const avgWpm10 = avg(last10, 'wpm');
    const avgRaw = tests.length ? tests.reduce((s, t) => s + Number(t.rawWpm || t.wpm || 0), 0) / tests.length : 0;
    const avgRaw10 = last10.length ? last10.reduce((s, t) => s + Number(t.rawWpm || t.wpm || 0), 0) / last10.length : 0;
    const avgAcc = avg(tests, 'acc');
    const avgAcc10 = avg(last10, 'acc');
    const avgCon = avg(tests, 'consistency');
    const avgCon10 = avg(last10, 'consistency');

    if (ELEMENTS.rangeWords) ELEMENTS.rangeWords.textContent = totalWords.toLocaleString();
    if (ELEMENTS.rangeStarted) ELEMENTS.rangeStarted.textContent = globalStats.testsStarted.toLocaleString();
    if (ELEMENTS.rangeCompleted) {
      const pct = globalStats.testsStarted > 0 ? (count / globalStats.testsStarted) * 100 : 0;
      ELEMENTS.rangeCompleted.textContent = count.toLocaleString() + ' (' + pct.toFixed(0) + '%)';
    }
    if (ELEMENTS.rangeRestarts) ELEMENTS.rangeRestarts.textContent = globalStats.restartsPerCompleted.toFixed(1) + ' restarts per completed test';
    if (ELEMENTS.rangeTime) ELEMENTS.rangeTime.textContent = formatHms(totalTime);
    if (ELEMENTS.rangeBestWpm) ELEMENTS.rangeBestWpm.textContent = max(tests, 'wpm').toFixed(0) + ' time ' + STATE.currentDuration;
    if (ELEMENTS.rangeAvgWpm) ELEMENTS.rangeAvgWpm.textContent = avgWpm.toFixed(0);
    if (ELEMENTS.rangeAvgWpm10) ELEMENTS.rangeAvgWpm10.textContent = 'last 10: ' + avgWpm10.toFixed(0);
    if (ELEMENTS.rangeBestRaw) ELEMENTS.rangeBestRaw.textContent = max(tests.map(t => ({ rawWpm: Number(t.rawWpm || t.wpm || 0) })), 'rawWpm').toFixed(0);
    if (ELEMENTS.rangeAvgRaw) ELEMENTS.rangeAvgRaw.textContent = avgRaw.toFixed(0);
    if (ELEMENTS.rangeAvgRaw10) ELEMENTS.rangeAvgRaw10.textContent = 'last 10: ' + avgRaw10.toFixed(0);
    if (ELEMENTS.rangeBestAcc) ELEMENTS.rangeBestAcc.textContent = max(tests, 'acc').toFixed(0) + '%';
    if (ELEMENTS.rangeAvgAcc) ELEMENTS.rangeAvgAcc.textContent = avgAcc.toFixed(0) + '%';
    if (ELEMENTS.rangeAvgAcc10) ELEMENTS.rangeAvgAcc10.textContent = 'last 10: ' + avgAcc10.toFixed(0) + '%';
    if (ELEMENTS.rangeBestCon) ELEMENTS.rangeBestCon.textContent = max(tests, 'consistency').toFixed(0) + '%';
    if (ELEMENTS.rangeAvgCon) ELEMENTS.rangeAvgCon.textContent = avgCon.toFixed(0) + '%';
    if (ELEMENTS.rangeAvgCon10) ELEMENTS.rangeAvgCon10.textContent = 'last 10: ' + avgCon10.toFixed(0) + '%';

    if (ELEMENTS.speedTrend) {
      const hours = totalTime / 3600;
      const trend = hours > 0 ? (avgWpm10 - avgWpm) / hours : 0;
      const sign = trend > 0 ? '+' : '';
      ELEMENTS.speedTrend.textContent = 'Speed change per hour spent typing: ' + sign + trend.toFixed(2) + ' wpm';
    }
  }

  function applyAdvancedFilters(tests) {
    const f = STATE.advancedFilters;
    return tests.filter(t => {
      const mode = t.type === 'texts' ? 'time' : (t.type || 'words');
      if (f.mode !== 'all' && f.mode !== mode && f.mode !== t.type) return false;
      if (f.time !== 'all' && String(t.duration || STATE.currentDuration) !== f.time) return false;
      if (f.words !== 'all' && String(t.wordCount || 50) !== f.words) return false;
      if (f.difficulty !== 'all' && String(t.difficulty || '1k') !== f.difficulty) return false;
      if (f.punctuation !== 'all' && String(t.punctuation || 'off') !== f.punctuation) return false;
      if (f.numbers !== 'all' && String(t.numbers || 'off') !== f.numbers) return false;
      if (f.language !== 'all' && String(t.language || 'es') !== f.language) return false;
      if (f.tags !== 'all') {
        const tags = t.tags || [];
        if (!tags.includes(f.tags)) return false;
      }
      return true;
    });
  }

  function formatActivityDateUTC(dateObj) {
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayName = week[dateObj.getUTCDay()];
    const dd = String(dateObj.getUTCDate()).padStart(2, '0');
    const month = mon[dateObj.getUTCMonth()];
    const yyyy = dateObj.getUTCFullYear();
    return dayName + ' ' + dd + ' ' + month + ' ' + yyyy;
  }

  function applyFilterPreset(preset) {
    if (!ELEMENTS.activityRangeSelect) return;
    if (preset === 'last day') ELEMENTS.activityRangeSelect.value = 'day';
    else if (preset === 'last week') ELEMENTS.activityRangeSelect.value = 'week';
    else if (preset === 'last month') ELEMENTS.activityRangeSelect.value = 'month';
    else if (preset === 'last 3 months') ELEMENTS.activityRangeSelect.value = '3months';
    else if (preset === 'all time') ELEMENTS.activityRangeSelect.value = 'all';
  }

  function drawProfileTrendChart(tests, metricMode) {
    if (!ELEMENTS.profileTrendChart) return;
    const canvas = ELEMENTS.profileTrendChart;
    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth || 860;
    canvas.height = 220;

    const style = getComputedStyle(document.body);
    const accent = style.getPropertyValue('--accent-primary').trim() || '#e2b714';
    const textLight = style.getPropertyValue('--text-light').trim() || '#a8aab5';
    const bgSec = style.getPropertyValue('--bg-secondary').trim() || '#2c2e31';

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = bgSec;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!tests || tests.length < 2) {
      ctx.fillStyle = textLight;
      ctx.font = '12px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('No data for selected filters', canvas.width / 2, canvas.height / 2);
      return;
    }

    const sorted = tests.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
    let values = sorted.map(t => Number(t.wpm || 0));
    if (metricMode === 'accuracy') values = sorted.map(t => Number(t.acc || 0));
    if (metricMode === 'avg10') {
      values = sorted.map((_, i) => {
        const base = sorted.slice(Math.max(0, i - 9), i + 1);
        return base.reduce((s, t) => s + Number(t.wpm || 0), 0) / base.length;
      });
    }
    if (metricMode === 'avg100') {
      values = sorted.map((_, i) => {
        const base = sorted.slice(Math.max(0, i - 99), i + 1);
        return base.reduce((s, t) => s + Number(t.wpm || 0), 0) / base.length;
      });
    }

    const pad = { left: 34, right: 10, top: 12, bottom: 20 };
    const w = canvas.width - pad.left - pad.right;
    const h = canvas.height - pad.top - pad.bottom;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = Math.max(1, max - min);

    ctx.beginPath();
    values.forEach((v, i) => {
      const x = pad.left + (i / Math.max(1, values.length - 1)) * w;
      const y = pad.top + h - ((v - min) / range) * h;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function saveTestResult(testData) {
    if (!STATE.currentUser) return;

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const user = users[STATE.currentUser.email];
    if (!user) return;

    const savedTest = {
      wpm: testData.wpm,
      rawWpm: testData.rawWpm,
      acc: testData.acc,
      consistency: testData.consistency,
      chars: testData.chars,
      charsCorrect: Number(testData.charsCorrect || 0),
      charsIncorrect: Number(testData.charsIncorrect || 0),
      time: testData.time,
      type: testData.type,
      mode: testData.mode || 'solo',
      versusOutcome: testData.versusOutcome || null,
      duration: testData.duration,
      wordCount: testData.wordCount,
      language: testData.language,
      difficulty: testData.difficulty,
      botDifficulty: testData.botDifficulty || null,
      punctuation: testData.punctuation,
      numbers: testData.numbers,
      tags: testData.tags || [],
      textId: testData.textId || null,
      textHash: testData.textHash || null,
      replay: testData.replay || null,
      wpmHistory: Array.isArray(testData.wpmHistory) ? testData.wpmHistory.slice() : [],
      appVersion: testData.appVersion || '1.0',
      textSource: testData.textSource || '',
      date: new Date().toISOString()
    };

    user.tests.push(savedTest);

    users[STATE.currentUser.email] = user;
    localStorage.setItem('users', JSON.stringify(users));

    showToast('Test guardado correctamente', 'ok');
    void sendTestResultToWebhooks(savedTest);
  }

  function bumpUserCounter(field, amount) {
    if (!STATE.currentUser) return;
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const user = users[STATE.currentUser.email];
    if (!user) return;
    user[field] = Math.max(0, Number(user[field] || 0) + amount);
    users[STATE.currentUser.email] = user;
    localStorage.setItem('users', JSON.stringify(users));
  }

  function generateTestText() {
    if (STATE.currentType === 'texts') {
      generatePresetText();
    } else {
      generateWordText();
    }
    STATE.charStates = new Array(STATE.testText.length).fill('empty');
  }

  function generateWordText() {
    const langBank = WORD_BANKS[STATE.currentLanguage] || WORD_BANKS.es;
    const bank = langBank[STATE.currentDifficulty] || langBank['1k'];
    const targetLen = 240;
    const words = [];
    let len = 0;

    while (len < targetLen) {
      let word = bank[Math.floor(Math.random() * bank.length)];

      if (STATE.optUppercase && Math.random() < 0.15) {
        word = word.charAt(0).toUpperCase() + word.slice(1);
      }

      if (STATE.optNumbers && Math.random() < 0.12) {
        words.push(NUMBERS[Math.floor(Math.random() * NUMBERS.length)]);
        len += 2;
      }

      words.push(word);
      len += word.length + 1;

      if (STATE.optPunctuation && words.length > 1 && Math.random() < 0.15) {
        const p = PUNCTUATION[Math.floor(Math.random() * PUNCTUATION.length)];
        words[words.length - 1] += p;
      }
    }

    STATE.testText = words.join(' ').trim();
  }

  function generatePresetText() {
    const languagePool = PRESET_TEXTS_BY_LANGUAGE[STATE.currentLanguage] || PRESET_TEXTS_BY_LANGUAGE.es;
    const pool = languagePool[STATE.currentCategory]
      || PRESET_TEXTS[STATE.currentCategory]
      || PRESET_TEXTS.literature;
    STATE.testText = pool[Math.floor(Math.random() * pool.length)];
  }

  // =====================================================================
  // 3-LINE CINEMATIC TEXT ENGINE
  // Splits test text into lines, renders as .text-line divs,
  // slides the track up when active line advances.
  // =====================================================================

  // Build an array of line objects from STATE.testText.
  // Each line is an array of {char, globalIdx}.
  // Lines are split at spaces to approximate visual wrapping.
  function buildTextLines() {
    const track = ELEMENTS.textTrack;
    if (!track) return;

    // Measure chars-per-line using a probe element
    let charsPerLine = 55; // safe default
    const probe = document.createElement('span');
    probe.className = 'text-line';
    probe.style.visibility = 'hidden';
    probe.style.position = 'absolute';
    probe.textContent = 'x'.repeat(60);
    track.appendChild(probe);
    const viewport = ELEMENTS.textViewport;
    if (viewport) {
      const vpW = viewport.offsetWidth;
      const probePx = probe.offsetWidth;
      if (probePx > 0) charsPerLine = Math.max(20, Math.floor((vpW / probePx) * 60));
    }
    probe.remove();

    // Split text into lines respecting word boundaries
    const words = STATE.testText.split(' ');
    const lines = []; // array of {chars: [{char, globalIdx}]}
    let currentLine = { chars: [], length: 0 };
    let globalIdx = 0;

    for (let wi = 0; wi < words.length; wi++) {
      const word = words[wi];
      const wordLen = word.length + (wi < words.length - 1 ? 1 : 0); // +1 for space
      if (currentLine.length > 0 && currentLine.length + wordLen > charsPerLine) {
        lines.push(currentLine);
        currentLine = { chars: [], length: 0 };
      }
      for (let ci = 0; ci < word.length; ci++) {
        currentLine.chars.push({ char: word[ci], globalIdx: globalIdx++ });
        currentLine.length++;
      }
      if (wi < words.length - 1) {
        currentLine.chars.push({ char: ' ', globalIdx: globalIdx++ });
        currentLine.length++;
      }
    }
    if (currentLine.chars.length > 0) lines.push(currentLine);

    STATE._textLines = lines;
    STATE._activeLineIdx = 0;

    // Render all lines into the DOM
    track.innerHTML = '';
    lines.forEach((line, li) => {
      const lineEl = document.createElement('div');
      lineEl.className = 'text-line line-below';
      lineEl.dataset.line = li;
      line.chars.forEach(({ char, globalIdx }) => {
        const s = document.createElement('span');
        s.dataset.i = globalIdx;
        s.textContent = char;
        lineEl.appendChild(s);
      });
      track.appendChild(lineEl);
    });

    // Activate first line
    _updateLineClasses(0);
    _scrollToLine(0, false);

    // Show/hide hint
    if (ELEMENTS.testHint) ELEMENTS.testHint.classList.remove('hidden');
  }

  // Called after each keystroke to update char state and possibly advance line
  function renderTextDisplay() {
    const track = ELEMENTS.textTrack;
    // If new 3-line engine is available, use it
    if (track && STATE._textLines) {
      _render3Line();
      return;
    }
    // Legacy fallback (if textDisplay exists)
    if (!ELEMENTS.textDisplay) return;
    let html = '';
    for (let i = 0; i < STATE.testText.length; i++) {
      const char = STATE.testText[i];
      const stateClass = STATE.charStates[i] === 'correct'
        ? 'correct'
        : STATE.charStates[i] === 'incorrect'
          ? 'incorrect'
          : '';
      const currentClass = i === STATE.currentCharIndex ? ' current' : '';
      html += '<span data-i="' + i + '" class="' + stateClass + currentClass + '">' + escapeHtml(char) + '</span>';
    }
    ELEMENTS.textDisplay.innerHTML = html;
    updateCaretPosition();
  }

  function _render3Line() {
    const track = ELEMENTS.textTrack;
    if (!track || !STATE._textLines) return;

    // Update all char spans' classes
    const allSpans = track.querySelectorAll('span[data-i]');
    allSpans.forEach(span => {
      const i = parseInt(span.dataset.i, 10);
      const state = STATE.charStates[i];
      span.className = state === 'correct'
        ? 'correct'
        : state === 'incorrect'
          ? 'incorrect'
          : i === STATE.currentCharIndex
            ? 'current'
            : '';
    });

    // Determine which line contains current char
    const curIdx = STATE.currentCharIndex;
    let newActiveLine = STATE._activeLineIdx || 0;
    for (let li = 0; li < STATE._textLines.length; li++) {
      const line = STATE._textLines[li];
      const first = line.chars[0].globalIdx;
      const last  = line.chars[line.chars.length - 1].globalIdx;
      if (curIdx >= first && curIdx <= last + 1) {
        newActiveLine = li;
        break;
      }
    }

    if (newActiveLine !== STATE._activeLineIdx) {
      STATE._activeLineIdx = newActiveLine;
      _updateLineClasses(newActiveLine);
      _scrollToLine(newActiveLine, true);
    }

    // Update caret position
    _updateCaret3Line(curIdx);

    // Hide hint once typing starts
    if (ELEMENTS.testHint && STATE.currentCharIndex > 0) {
      ELEMENTS.testHint.classList.add('hidden');
    }
  }

  function _updateLineClasses(activeIdx) {
    const track = ELEMENTS.textTrack;
    if (!track) return;
    const lineEls = track.querySelectorAll('.text-line');
    lineEls.forEach((el, li) => {
      el.classList.remove('line-above', 'line-active', 'line-below');
      if (li < activeIdx)      el.classList.add('line-above');
      else if (li === activeIdx) el.classList.add('line-active');
      else                     el.classList.add('line-below');
    });
  }

  function _scrollToLine(activeIdx, animate) {
    const track = ELEMENTS.textTrack;
    const viewport = ELEMENTS.textViewport;
    if (!track || !viewport) return;
    // Each line is --line-h tall. We want: line at index `activeIdx` to sit in the middle slot (index 1 of 3).
    const lineH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--line-h')) || 35;
    // Target offset: shift track so that activeLine is centered (slot 1 = 1 lineH from top of viewport)
    const targetTranslateY = -((activeIdx - 1) * lineH);
    track.style.transform = 'translateY(' + targetTranslateY + 'px)';
    if (!animate) {
      track.style.transition = 'none';
      // Re-enable after paint
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { track.style.transition = ''; });
      });
    }
  }

  function _updateCaret3Line(charIdx) {
    const caret = ELEMENTS.typingCaret;
    if (!caret) return;
    if (charIdx >= STATE.testText.length) { caret.style.opacity = '0'; return; }
    const span = ELEMENTS.textTrack
      ? ELEMENTS.textTrack.querySelector('span[data-i="' + charIdx + '"]')
      : null;
    if (!span) { caret.style.opacity = '0'; return; }
    const viewport = ELEMENTS.textViewport;
    const areaRect  = (viewport || ELEMENTS.textTrack).getBoundingClientRect();
    const spanRect  = span.getBoundingClientRect();
    const x = spanRect.left - areaRect.left;
    const y = spanRect.top  - areaRect.top + (spanRect.height * 0.06);
    const h = Math.max(14, spanRect.height * 0.86);
    caret.style.opacity = '1';
    caret.style.left   = x + 'px';
    caret.style.top    = y + 'px';
    caret.style.height = h + 'px';
  }

  function updateCaretPosition() {
    // Route to new engine if available
    if (ELEMENTS.textTrack && STATE._textLines) {
      _updateCaret3Line(STATE.currentCharIndex);
      return;
    }
    const caret = ELEMENTS.typingCaret;
    if (!caret) return;
    if (STATE.currentCharIndex >= STATE.testText.length) { caret.style.opacity = '0'; return; }
    if (!ELEMENTS.textDisplay) return;
    const currentEl = ELEMENTS.textDisplay.querySelector('[data-i="' + STATE.currentCharIndex + '"]');
    if (!currentEl) return;
    const testAreaRect = ELEMENTS.textDisplay.parentElement.getBoundingClientRect();
    const charRect = currentEl.getBoundingClientRect();
    const x = charRect.left - testAreaRect.left;
    const y = charRect.top  - testAreaRect.top + (charRect.height * 0.08);
    const h = Math.max(12, charRect.height * 0.84);
    caret.style.opacity = '1';
    caret.style.left   = x + 'px';
    caret.style.top    = y + 'px';
    caret.style.height = h + 'px';
    currentEl.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
  }

  function setCategoryChipActive(category) {
    ELEMENTS.textCategoryChips.forEach(chip => {
      const isActive = chip.dataset.category === category;
      chip.classList.toggle('active', isActive);
      chip.setAttribute('aria-checked', isActive ? 'true' : 'false');
    });
  }

  function updateTimerUiForMode() {
    const isTextMode = STATE.currentType === 'texts';
    ELEMENTS.timeGroup.style.display = isTextMode ? 'none' : 'flex';
    ELEMENTS.timeLabel.textContent = isTextMode ? 'Cronómetro:' : 'Duración:';
    ELEMENTS.timerValue.textContent = isTextMode ? '0s' : (STATE.currentDuration + 's');
  }

  function startActiveTimer() {
    clearInterval(STATE.timerInterval);

    if (STATE.currentType === 'texts') {
      STATE.timerInterval = setInterval(() => {
        STATE.elapsedTime = Date.now() - STATE.testStartTime;
        ELEMENTS.timerValue.textContent = Math.floor(STATE.elapsedTime / 1000) + 's';
      }, 100);
      return;
    }

    const durationMs = STATE.currentDuration * 1000;
    STATE.timerInterval = setInterval(() => {
      STATE.elapsedTime = Date.now() - STATE.testStartTime;
      const remaining = Math.max(0, Math.ceil((durationMs - STATE.elapsedTime) / 1000));
      ELEMENTS.timerValue.textContent = remaining + 's';
      if (remaining === 0) {
        clearInterval(STATE.timerInterval);
        endTest();
      }
    }, 100);
  }

  // ========== SISTEMA DE TOAST ==========
  let _toastTimer = null;
  function showToast(message, type, duration) {
    type     = type     || 'info';
    duration = duration || 3000;
    // Use the new toast container if available, fall back to legacy competitive toast
    const container = ELEMENTS.toastContainer || document.getElementById('toastContainer');
    if (container) {
      const toast = document.createElement('div');
      toast.className = 'toast ' + (type === 'ok' ? 'ok' : type === 'err' ? 'err' : type === 'warn' ? 'warn' : '');
      toast.textContent = message;
      container.appendChild(toast);
      setTimeout(() => {
        toast.style.transition = 'opacity 300ms ease, transform 300ms ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(6px)';
        setTimeout(() => toast.remove(), 320);
      }, duration);
      return;
    }
    // Legacy fallback
    const el = document.getElementById('competitiveToast');
    if (!el) return;
    el.textContent = message;
    el.style.display = 'block';
    el.style.opacity = '1';
    if (_toastTimer) clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => {
      el.style.opacity = '0';
      setTimeout(() => { el.style.display = 'none'; el.style.opacity = '1'; }, 350);
    }, duration);
  }

  function setupEventListeners() {
    ELEMENTS.navButtons.forEach(btn => btn.addEventListener('click', handleNavigation));

    ELEMENTS.typeWords.addEventListener('click', () => switchContentType('words'));
    ELEMENTS.typeTexts.addEventListener('click', () => switchContentType('texts'));

    ELEMENTS.testLanguage.addEventListener('change', e => {
      STATE.currentLanguage = e.target.value;
      rebuildTest();
    });
    ELEMENTS.difficultySelect.addEventListener('change', e => {
      STATE.currentDifficulty = e.target.value;
      rebuildTest();
    });
    ELEMENTS.textCategoryChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const category = chip.dataset.category;
        if (!category || category === STATE.currentCategory) return;
        STATE.currentCategory = category;
        setCategoryChipActive(category);
        rebuildTest();
      });
    });
    ELEMENTS.timeSelect.addEventListener('change', e => {
      STATE.currentDuration = parseInt(e.target.value, 10);
      updateTimerUiForMode();
      rebuildTest();
    });

    ELEMENTS.optUppercase.addEventListener('change', e => {
      STATE.optUppercase = e.target.checked;
      rebuildTest();
    });
    ELEMENTS.optPunctuation.addEventListener('change', e => {
      STATE.optPunctuation = e.target.checked;
      rebuildTest();
    });
    ELEMENTS.optNumbers.addEventListener('change', e => {
      STATE.optNumbers = e.target.checked;
      rebuildTest();
    });

    ELEMENTS.testInput.addEventListener('keydown', handleKeyDown);
    ELEMENTS.testInput.addEventListener('input', handleTestInput);
    // Click on text area or legacy textDisplay → focus input
    if (ELEMENTS.testArea) ELEMENTS.testArea.addEventListener('click', () => ELEMENTS.testInput.focus());
    if (ELEMENTS.textDisplay) ELEMENTS.textDisplay.addEventListener('click', () => ELEMENTS.testInput.focus());

    ELEMENTS.restartBtn.addEventListener('click', rebuildTest);
    if (ELEMENTS.retryBtn) ELEMENTS.retryBtn.addEventListener('click', closeResults);

    ELEMENTS.themeButtons.forEach(btn => btn.addEventListener('click', handleThemeChange));
    ELEMENTS.soundToggle.addEventListener('change', () => {
      STATE.soundEnabled = ELEMENTS.soundToggle.checked;
      localStorage.setItem('soundEnabled', STATE.soundEnabled);
    });
    ELEMENTS.clearDataBtn.addEventListener('click', () => {
      if (confirm('¿Limpiar todos los datos locales?')) {
        localStorage.clear();
        location.reload();
      }
    });
    const bannerCloseEl = ELEMENTS.bannerClose || document.querySelector('.banner-close');
    if (bannerCloseEl) {
      bannerCloseEl.addEventListener('click', () => {
        const banner = ELEMENTS.topBanner || document.querySelector('.banner');
        if (banner) banner.style.display = 'none';
      });
    }

    // ── Config toggle button (⋯) — expand/collapse config panel
    if (ELEMENTS.configToggleBtn && ELEMENTS.modesPanel) {
      ELEMENTS.configToggleBtn.addEventListener('click', () => {
        const isHidden = ELEMENTS.modesPanel.classList.contains('panel-hidden');
        ELEMENTS.modesPanel.classList.toggle('panel-hidden', !isHidden);
        ELEMENTS.configToggleBtn.classList.toggle('active', !isHidden ? false : true);
        if (ELEMENTS.configBar) ELEMENTS.configBar.classList.toggle('config-bar--expanded', !isHidden ? false : true);
      });
    }

    // ── Config bar quick chips (type / duration / difficulty)
    document.querySelectorAll('.config-bar__chip[data-dur]').forEach(btn => {
      btn.addEventListener('click', () => {
        const dur = parseInt(btn.dataset.dur, 10);
        STATE.currentDuration = dur;
        // Sync hidden select
        if (ELEMENTS.timeSelect) ELEMENTS.timeSelect.value = String(dur);
        updateTimerUiForMode();
        // Update config-chip active state in full panel
        document.querySelectorAll('.config-chip[data-ctrl="timeSelect"]').forEach(c => {
          c.classList.toggle('config-chip--active', c.dataset.val === String(dur));
        });
        // Update config-bar chips
        document.querySelectorAll('.config-bar__chip[data-dur]').forEach(c => {
          c.classList.toggle('config-bar__chip--active', c.dataset.dur === String(dur));
        });
        rebuildTest();
      });
    });
    document.querySelectorAll('.config-bar__chip[data-diff]').forEach(btn => {
      btn.addEventListener('click', () => {
        const diff = btn.dataset.diff;
        STATE.currentDifficulty = diff;
        if (ELEMENTS.difficultySelect) ELEMENTS.difficultySelect.value = diff;
        document.querySelectorAll('.config-chip[data-ctrl="difficultySelect"]').forEach(c => {
          c.classList.toggle('config-chip--active', c.dataset.val === diff);
        });
        document.querySelectorAll('.config-bar__chip[data-diff]').forEach(c => {
          c.classList.toggle('config-bar__chip--active', c.dataset.diff === diff);
        });
        rebuildTest();
      });
    });
    document.querySelectorAll('.config-bar__chip[data-type]').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        switchContentType(type);
        document.querySelectorAll('.config-bar__chip[data-type]').forEach(c => {
          c.classList.toggle('config-bar__chip--active', c.dataset.type === type);
        });
      });
    });
    // Punct/nums toggles in config-bar
    const cbPunct = $('cbPunct');
    const cbNums  = $('cbNums');
    if (cbPunct) {
      cbPunct.addEventListener('click', () => {
        STATE.optPunctuation = !STATE.optPunctuation;
        if (ELEMENTS.optPunctuation) ELEMENTS.optPunctuation.checked = STATE.optPunctuation;
        cbPunct.classList.toggle('config-bar__chip--active', STATE.optPunctuation);
        rebuildTest();
      });
    }
    if (cbNums) {
      cbNums.addEventListener('click', () => {
        STATE.optNumbers = !STATE.optNumbers;
        if (ELEMENTS.optNumbers) ELEMENTS.optNumbers.checked = STATE.optNumbers;
        cbNums.classList.toggle('config-bar__chip--active', STATE.optNumbers);
        rebuildTest();
      });
    }

    if (ELEMENTS.closeResultsBtn) ELEMENTS.closeResultsBtn.addEventListener('click', closeResults);
    // modalOverlay is no longer used for results, but keep for other modals
    if (ELEMENTS.modalOverlay) ELEMENTS.modalOverlay.addEventListener('click', closeResults);

    ELEMENTS.registerForm.addEventListener('submit', async e => {
      e.preventDefault();
      const username = $('regUsername').value.trim();
      const email = $('regEmail').value.trim();
      const password = $('regPassword').value;
      const confirmPassword = $('regPasswordConfirm').value;
      
      if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
      
      if (await registerUser(username, email, password)) {
        $('regUsername').value = '';
        $('regEmail').value = '';
        $('regPassword').value = '';
        $('regPasswordConfirm').value = '';
      }
    });

    ELEMENTS.loginForm.addEventListener('submit', async e => {
      e.preventDefault();
      const email = $('loginEmail').value.trim();
      const password = $('loginPassword').value;
      
      if (await loginUser(email, password)) {
        $('loginEmail').value = '';
        $('loginPassword').value = '';
      }
    });

    ELEMENTS.toLoginLink.addEventListener('click', e => {
      e.preventDefault();
      ELEMENTS.registerPanel.style.display = 'none';
      ELEMENTS.loginPanel.style.display = 'block';
    });

    ELEMENTS.toRegisterLink.addEventListener('click', e => {
      e.preventDefault();
      ELEMENTS.loginPanel.style.display = 'none';
      ELEMENTS.registerPanel.style.display = 'block';
    });

    ELEMENTS.logoutBtn.addEventListener('click', () => {
      if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        logoutUser();
      }
    });

    ELEMENTS.progressTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        ELEMENTS.progressTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        drawProgressChart(tab.dataset.period);
      });
    });

    if (ELEMENTS.activityRangeSelect) {
      ELEMENTS.activityRangeSelect.addEventListener('change', () => {
        displayProfile();
        void syncRemoteProfile({ allowNullOriginPing: true });
      });
    }

    if (ELEMENTS.activityLessLink) {
      ELEMENTS.activityLessLink.addEventListener('click', e => {
        e.preventDefault();
        STATE.activityExpanded = false;
        if (ELEMENTS.activityList) ELEMENTS.activityList.style.display = 'none';
      });
    }

    if (ELEMENTS.activityMoreLink) {
      ELEMENTS.activityMoreLink.addEventListener('click', e => {
        e.preventDefault();
        STATE.activityExpanded = true;
        if (ELEMENTS.activityList) ELEMENTS.activityList.style.display = 'grid';
      });
    }

    if (ELEMENTS.copyPublicLinkBtn) {
      ELEMENTS.copyPublicLinkBtn.addEventListener('click', async () => {
        const slug = STATE.currentUser ? STATE.currentUser.username : 'user';
        const link = location.origin + location.pathname + '#profile-' + slug;
        try {
          await navigator.clipboard.writeText(link);
          alert('Enlace copiado: ' + link);
        } catch (_) {
          alert('No se pudo copiar el enlace.');
        }
      });
    }

    if (ELEMENTS.editProfileBtn) {
      ELEMENTS.editProfileBtn.addEventListener('click', () => {
        alert('Editor de perfil disponible en una próxima versión.');
      });
    }

    if (ELEMENTS.reloadProfileBtn) {
      ELEMENTS.reloadProfileBtn.addEventListener('click', async () => {
        setReloadProfileStatus('Recargando datos...', '');
        const result = await syncRemoteProfile({ allowNullOriginPing: true });
        if (!result || !result.ok) {
          const reason = result && result.reason ? result.reason : 'unknown';
          if (reason === 'null-origin') {
            setReloadProfileStatus('Bloqueado por CORS en file://. Publica o usa localhost.', 'err');
          } else if (reason === 'endpoint-404') {
            setReloadProfileStatus('Webhook profile no encontrado (404). Revisa ruta/activación en n8n.', 'err');
          } else if (reason === 'backend-5xx') {
            setReloadProfileStatus('Backend n8n respondió 5xx. Revisa ejecución del workflow y CORS.', 'err');
          } else if (reason === 'network-or-cors') {
            setReloadProfileStatus('Petición bloqueada por red/CORS. Revisa Access-Control-Allow-Origin.', 'err');
          } else if (reason === 'retry-later') {
            setReloadProfileStatus('Reintentando en unos segundos para evitar spam de errores.', '');
          } else if (reason === 'in-flight') {
            setReloadProfileStatus('Sincronización ya en curso.', '');
          } else {
            setReloadProfileStatus('No se pudo recargar datos remotos.', 'err');
          }
          return;
        }

        if (result.reason === 'ping-only') {
          setReloadProfileStatus('Solicitud enviada (modo file://, sin lectura de respuesta).', '');
        } else {
          if (result.sourceUrl) {
            setProfileSyncMeta('Flujo activado en ' + result.sourceUrl);
          }
          setReloadProfileStatus('Datos actualizados desde backend.', 'ok');
        }
      });
    }

    if (ELEMENTS.reloadLeaderboardBtn) {
      ELEMENTS.reloadLeaderboardBtn.addEventListener('click', async () => {
        setReloadLeaderboardStatus('Recargando ranking...', '');
        const result = await syncRemoteLeaderboard({ allowNullOriginPing: true, limit: 20 });
        if (!result || !result.ok) {
          const reason = result && result.reason ? result.reason : 'unknown';
          if (reason === 'null-origin') {
            setReloadLeaderboardStatus('Bloqueado por CORS en file://. Publica o usa localhost.', 'err');
          } else if (reason === 'endpoint-404') {
            setReloadLeaderboardStatus('Webhook leaderboard no activo (404). Activa el workflow en n8n.', 'err');
          } else if (reason === 'backend-5xx') {
            setReloadLeaderboardStatus('Backend n8n respondió 5xx. Revisa workflow y logs del endpoint.', 'err');
          } else if (reason === 'network-or-cors') {
            setReloadLeaderboardStatus('Petición bloqueada por red/CORS. Revisa Access-Control-Allow-Origin.', 'err');
          } else if (reason === 'in-flight') {
            setReloadLeaderboardStatus('Sincronización ya en curso.', '');
          } else {
            setReloadLeaderboardStatus('No se pudo recargar leaderboard remoto.', 'err');
          }
          return;
        }

        if (result.reason === 'ping-only') {
          setReloadLeaderboardStatus('Solicitud enviada (modo file://, sin lectura de respuesta).', '');
        } else {
          setReloadLeaderboardStatus('Leaderboard actualizado desde backend.', 'ok');
        }
      });
    }

    if (ELEMENTS.exportCsvBtn) {
      ELEMENTS.exportCsvBtn.addEventListener('click', () => {
        exportTestsCsv();
      });
    }

    if (ELEMENTS.loadMoreTestsBtn) {
      ELEMENTS.loadMoreTestsBtn.addEventListener('click', () => {
        alert('Mostrando el histórico disponible (límite actual localStorage).');
      });
    }

    document.querySelectorAll('.metric-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.metric-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        STATE.profileMetricMode = btn.dataset.metric || 'speed';
        displayProfile();
      });
    });

    document.querySelectorAll('.filter-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilterPreset(btn.textContent.trim().toLowerCase());
        displayProfile();
      });
    });

    [
      ELEMENTS.filterDate, ELEMENTS.filterMode, ELEMENTS.filterTime, ELEMENTS.filterWords,
      ELEMENTS.filterDifficulty, ELEMENTS.filterPunctuation, ELEMENTS.filterNumbers,
      ELEMENTS.filterLanguage, ELEMENTS.filterFunbox, ELEMENTS.filterTags
    ].forEach(sel => {
      if (!sel) return;
      sel.addEventListener('change', () => {
        STATE.advancedFilters.date = ELEMENTS.filterDate ? ELEMENTS.filterDate.value : 'all';
        STATE.advancedFilters.mode = ELEMENTS.filterMode ? ELEMENTS.filterMode.value : 'all';
        STATE.advancedFilters.time = ELEMENTS.filterTime ? ELEMENTS.filterTime.value : 'all';
        STATE.advancedFilters.words = ELEMENTS.filterWords ? ELEMENTS.filterWords.value : 'all';
        STATE.advancedFilters.difficulty = ELEMENTS.filterDifficulty ? ELEMENTS.filterDifficulty.value : 'all';
        STATE.advancedFilters.punctuation = ELEMENTS.filterPunctuation ? ELEMENTS.filterPunctuation.value : 'all';
        STATE.advancedFilters.numbers = ELEMENTS.filterNumbers ? ELEMENTS.filterNumbers.value : 'all';
        STATE.advancedFilters.language = ELEMENTS.filterLanguage ? ELEMENTS.filterLanguage.value : 'all';
        STATE.advancedFilters.funbox = ELEMENTS.filterFunbox ? ELEMENTS.filterFunbox.value : 'all';
        STATE.advancedFilters.tags = ELEMENTS.filterTags ? ELEMENTS.filterTags.value : 'all';
        displayProfile();
      });
    });

    // Event listeners para modal de Términos de Servicio
    const termsLink = document.getElementById('termsLink');
    const termsModal = $('termsModal');
    const termsModalOverlay = $('termsModalOverlay');
    const closeTermsBtn = $('closeTermsBtn');
    
    if (termsLink && termsModal) {
      termsLink.addEventListener('click', e => {
        e.preventDefault();
        termsModal.style.display = 'block';
        if (termsModalOverlay) termsModalOverlay.style.display = 'block';
      });
    }

    if (closeTermsBtn && termsModal) {
      closeTermsBtn.addEventListener('click', () => {
        termsModal.style.display = 'none';
        if (termsModalOverlay) termsModalOverlay.style.display = 'none';
      });
    }

    if (termsModalOverlay && termsModal) {
      termsModalOverlay.addEventListener('click', () => {
        termsModal.style.display = 'none';
        termsModalOverlay.style.display = 'none';
      });
    }

    // Event listeners para los botones de modo de gráfico (escala/raw/errores)
    ELEMENTS.chartModeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        redrawChart(btn.dataset.mode);
      });
    });

    // Event listeners para botones de acciones de resultados
    if (ELEMENTS.nextTestBtn) {
      ELEMENTS.nextTestBtn.addEventListener('click', () => {
        closeResults();
        rebuildTest();
      });
    }

    if (ELEMENTS.repeatTestBtn) {
      ELEMENTS.repeatTestBtn.addEventListener('click', () => {
        closeResults();
        resetTest();
        ELEMENTS.testInput.focus();
      });
    }

    if (ELEMENTS.versusModeType) {
      ELEMENTS.versusModeType.addEventListener('change', e => {
        STATE.versus.modeType = e.target.value;
        updateVersusModeUi();
      });
    }

    if (ELEMENTS.versusTimeSelect) {
      ELEMENTS.versusTimeSelect.addEventListener('change', e => {
        STATE.versus.duration = parseInt(e.target.value, 10) || 60;
        refreshVersusObjectiveUi();
      });
    }

    if (ELEMENTS.versusWordsSelect) {
      ELEMENTS.versusWordsSelect.addEventListener('change', e => {
        STATE.versus.wordCount = parseInt(e.target.value, 10) || 50;
        refreshVersusObjectiveUi();
      });
    }

    if (ELEMENTS.versusLanguage) {
      ELEMENTS.versusLanguage.addEventListener('change', e => {
        STATE.versus.language = e.target.value;
      });
    }

    if (ELEMENTS.versusDifficulty) {
      ELEMENTS.versusDifficulty.addEventListener('change', e => {
        STATE.versus.difficulty = e.target.value;
      });
    }

    if (ELEMENTS.versusBotDifficulty) {
      ELEMENTS.versusBotDifficulty.addEventListener('change', e => {
        STATE.versus.botDifficulty = e.target.value;
      });
    }

    if (ELEMENTS.versusStartBtn) {
      ELEMENTS.versusStartBtn.addEventListener('click', () => {
        startVersusMatch();
      });
    }

    if (ELEMENTS.versusUserArea && ELEMENTS.versusInput) {
      ELEMENTS.versusUserArea.addEventListener('click', () => {
        if (STATE.versus.isActive) ELEMENTS.versusInput.focus();
      });
      ELEMENTS.versusInput.addEventListener('input', handleVersusInput);
      ELEMENTS.versusInput.addEventListener('keydown', e => {
        if (e.key === ' ' && !STATE.versus.isActive) e.preventDefault();
      });
    }

    if (ELEMENTS.closeVersusResultsBtn) {
      ELEMENTS.closeVersusResultsBtn.addEventListener('click', closeVersusResultsModal);
    }

    if (ELEMENTS.versusModalOverlay) {
      ELEMENTS.versusModalOverlay.addEventListener('click', closeVersusResultsModal);
    }

    if (ELEMENTS.versusRematchBtn) {
      ELEMENTS.versusRematchBtn.addEventListener('click', () => {
        closeVersusResultsModal();
        if (STATE.versus.lastConfig) {
          applyVersusConfigToControls(STATE.versus.lastConfig);
        }
        startVersusMatch(true);
      });
    }

    if (ELEMENTS.versusNewMatchBtn) {
      ELEMENTS.versusNewMatchBtn.addEventListener('click', () => {
        closeVersusResultsModal();
        stopVersusMatch('idle');
      });
    }

    if (ELEMENTS.langBaseSelect) {
      ELEMENTS.langBaseSelect.addEventListener('change', e => {
        STATE.languages.base = e.target.value;
        ensureLanguagePairValidity();
        persistLanguagesState();
        renderLanguagesSection();
      });
    }

    if (ELEMENTS.langTargetSelect) {
      ELEMENTS.langTargetSelect.addEventListener('change', e => {
        STATE.languages.target = e.target.value;
        ensureLanguagePairValidity();
        persistLanguagesState();
        renderLanguagesSection();
      });
    }

    if (ELEMENTS.languageCheckBtn) {
      ELEMENTS.languageCheckBtn.addEventListener('click', () => {
        submitLanguagePhrase();
      });
    }

    if (ELEMENTS.languageTypingInput) {
      ELEMENTS.languageTypingInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          submitLanguagePhrase();
        }
      });
    }

    if (ELEMENTS.languageCloseLessonBtn) {
      ELEMENTS.languageCloseLessonBtn.addEventListener('click', () => {
        STATE.languages.activeLesson = null;
        renderLanguagesLessonPanel();
      });
    }

    if (ELEMENTS.languageDonateBtn) {
      ELEMENTS.languageDonateBtn.addEventListener('click', e => {
        e.preventDefault();
        rewardLanguageSupportClick();
      });
    }

    if (ELEMENTS.arenaBenefitsToggle) {
      ELEMENTS.arenaBenefitsToggle.addEventListener('click', () => {
        const list = ELEMENTS.arenaBenefitsList;
        if (!list) return;
        const isOpen = list.classList.toggle('open');
        ELEMENTS.arenaBenefitsToggle.textContent = isOpen ? '▴' : '▾';
      });
    }

    if (ELEMENTS.top100Fab) {
      ELEMENTS.top100Fab.addEventListener('click', () => {
        if (!ELEMENTS.top100Dropdown) return;
        const isVisible = ELEMENTS.top100Dropdown.style.display === 'block';
        ELEMENTS.top100Dropdown.style.display = isVisible ? 'none' : 'block';
      });
    }

    // ── Full config panel: accordion toggle
    const accordionBtn = document.querySelector('.config-accordion-btn');
    if (accordionBtn) {
      accordionBtn.addEventListener('click', () => {
        const body = document.getElementById('advancedBody');
        const isOpen = !body.hidden;
        body.hidden = isOpen;
        accordionBtn.setAttribute('aria-expanded', !isOpen);
        const arrow = accordionBtn.querySelector('.config-accordion-arrow');
        if (arrow) arrow.textContent = isOpen ? '›' : '⌄';
      });
    }

    // ── Full config panel: config-chip syncs selects
    document.querySelectorAll('.config-chip[data-ctrl]').forEach(chip => {
      chip.addEventListener('click', () => {
        const ctrl = chip.dataset.ctrl;
        const val  = chip.dataset.val;
        if (!ctrl || !val) return;
        const sel = document.getElementById(ctrl);
        if (sel) { sel.value = val; sel.dispatchEvent(new Event('change')); }
        // Visual active state
        document.querySelectorAll('.config-chip[data-ctrl="' + ctrl + '"]').forEach(c => {
          c.classList.toggle('config-chip--active', c.dataset.val === val);
        });
      });
    });

    // ── Full config panel: Start / Reset buttons
    const configStartBtn = document.getElementById('configStartBtn');
    if (configStartBtn) {
      configStartBtn.addEventListener('click', () => {
        if (ELEMENTS.modesPanel) ELEMENTS.modesPanel.classList.add('panel-hidden');
        ELEMENTS.testInput.focus();
      });
    }
    const configResetBtn = document.getElementById('configResetBtn');
    if (configResetBtn) {
      configResetBtn.addEventListener('click', () => {
        rebuildTest();
        if (ELEMENTS.modesPanel) ELEMENTS.modesPanel.classList.add('panel-hidden');
      });
    }

    window.addEventListener('resize', () => {
      updateCaretPosition();
      updateVersusCaretPosition();
      // Rebuild lines on resize since char-per-line changes
      if (ELEMENTS.textTrack && STATE._textLines && !STATE.isTestActive) {
        STATE._textLines = null;
        buildTextLines();
      }
    });

    document.addEventListener('keydown', handleGlobalShortcuts);
  }

  function switchContentType(type) {
    STATE.currentType = type;
    ELEMENTS.typeWords.classList.toggle('active', type === 'words');
    ELEMENTS.typeTexts.classList.toggle('active', type === 'texts');
    ELEMENTS.diffGroup.style.display = type === 'words' ? 'flex' : 'none';
    ELEMENTS.textCategoryGroup.style.display = type === 'texts' ? 'flex' : 'none';
    ELEMENTS.wordOptions.style.display = type === 'words' ? 'flex' : 'none';
    updateTimerUiForMode();
    rebuildTest();
  }

  function rebuildTest() {
    if (STATE.isTestActive) {
      bumpUserCounter('restarts', 1);
    }
    generateTestText();
    resetTest();
  }

  function handleKeyDown(e) {
    // Prevent Tab from moving focus away from the test input
    if (e.key === 'Tab') {
      e.preventDefault();
      return;
    }

    // Ctrl+Backspace / Ctrl+Delete: delete back to start of current word
    if (e.ctrlKey && (e.key === 'Backspace' || e.key === 'Delete')) {
      e.preventDefault();
      if (!STATE.isTestActive) return;
      const input = ELEMENTS.testInput.value;
      const truncated = input.slice(0, STATE.wordStartIndex);
      ELEMENTS.testInput.value = truncated;
      // Roll back char states for all removed characters
      for (let i = input.length - 1; i >= STATE.wordStartIndex; i--) {
        rollbackCharState(i);
      }
      STATE.currentCharIndex = STATE.wordStartIndex;
      STATE.prevInputLength = STATE.wordStartIndex;
      updateLiveMetrics();
      renderTextDisplay();
      return;
    }

    if (!STATE.isTestActive && e.key.length === 1) {
      startTest();
    }

    if (e.key === ' ') {
      e.preventDefault();
      if (!STATE.isTestActive) return;
      commitCurrentWordAndAdvance();
      return;
    }
  }

  function handleTestInput() {
    if (!STATE.isTestActive) return;

    const input = ELEMENTS.testInput.value;
    const newLen = input.length;

    if (newLen > STATE.testText.length) {
      ELEMENTS.testInput.value = input.slice(0, STATE.testText.length);
      return;
    }

    if (newLen > STATE.prevInputLength) {
      const pos = newLen - 1;
      const typed = input[pos];
      const expected = STATE.testText[pos];
      setCharStateFromTyping(pos, typed, expected);
      STATE.currentCharIndex = newLen;
    } else if (newLen < STATE.prevInputLength) {
      const removedPos = STATE.prevInputLength - 1;
      rollbackCharState(removedPos);
      STATE.currentCharIndex = newLen;
      STATE.wordStartIndex = Math.min(STATE.wordStartIndex, newLen);
    }

    STATE.prevInputLength = newLen;
    updateLiveMetrics();
    renderTextDisplay();

    if (newLen >= STATE.testText.length) {
      if (STATE.currentType === 'words') {
        // En modo palabras, generar más palabras en lugar de terminar
        extendTestText();
      } else {
        // En modo textos, terminar cuando se completa el texto
        endTest();
      }
    }
  }

  function extendTestText() {
    // Guardar texto actual y sus estados
    const currentText = STATE.testText;
    const currentStates = [...STATE.charStates];

    // Generar nuevas palabras
    generateWordText();
    const newWords = STATE.testText;

    // Combinar texto: anterior + espacio + nuevas palabras
    STATE.testText = currentText + ' ' + newWords;

    // Crear nuevo array de estados de caracteres
    const newCharStates = new Array(STATE.testText.length).fill('empty');

    // Copiar estados del texto anterior
    for (let i = 0; i < currentText.length; i++) {
      newCharStates[i] = currentStates[i];
    }

    // El espacio es 'empty', y nuevas palabras comienzan como 'empty'
    STATE.charStates = newCharStates;

    // Rebuild 3-line engine for the extended text
    if (ELEMENTS.textTrack) {
      STATE._textLines = null;
      buildTextLines();
      _render3Line();
    } else {
      renderTextDisplay();
    }
  }

  function setCharStateFromTyping(pos, typed, expected) {
    if (typed === expected) {
      if (STATE.charStates[pos] === 'incorrect') {
        STATE.incorrectChars = Math.max(0, STATE.incorrectChars - 1);
        STATE.correctedChars++;
      } else if (STATE.charStates[pos] !== 'correct') {
        STATE.correctChars++;
      }
      STATE.charStates[pos] = 'correct';
      return;
    }

    if (STATE.charStates[pos] === 'correct') {
      STATE.correctChars = Math.max(0, STATE.correctChars - 1);
      STATE.incorrectChars++;
    } else if (STATE.charStates[pos] !== 'incorrect') {
      STATE.incorrectChars++;
    }
    STATE.charStates[pos] = 'incorrect';
  }

  function rollbackCharState(pos) {
    if (pos < 0 || pos >= STATE.charStates.length) return;

    if (STATE.charStates[pos] === 'correct') {
      STATE.correctChars = Math.max(0, STATE.correctChars - 1);
    } else if (STATE.charStates[pos] === 'incorrect') {
      STATE.incorrectChars = Math.max(0, STATE.incorrectChars - 1);
      STATE.correctedChars++;
    }
    STATE.charStates[pos] = 'empty';
  }

  function commitCurrentWordAndAdvance() {
    const start = STATE.wordStartIndex;
    if (start >= STATE.testText.length) {
      endTest();
      return;
    }

    const nextSpace = STATE.testText.indexOf(' ', start);
    const wordEnd = nextSpace === -1 ? STATE.testText.length : nextSpace;
    const typedWord = ELEMENTS.testInput.value.slice(start, STATE.currentCharIndex);

    let mismatchStreak = 0;
    let maxMismatchStreak = 0;

    for (let i = start; i < wordEnd; i++) {
      const rel = i - start;
      const typed = typedWord[rel] || '';
      const expected = STATE.testText[i];

      if (typed === expected) {
        mismatchStreak = 0;
      } else {
        mismatchStreak += 1;
        maxMismatchStreak = Math.max(maxMismatchStreak, mismatchStreak);
      }

      setCharStateFromTyping(i, typed, expected);
    }

    if (nextSpace !== -1) {
      setCharStateFromTyping(nextSpace, ' ', ' ');
    }

    // Si hubo varias fallas seguidas, el sistema considera la palabra como errada
    // pero permite continuar al siguiente bloque sin bloquear el test.
    if (maxMismatchStreak >= 2) {
      for (let i = start; i < wordEnd; i++) {
        if (STATE.charStates[i] !== 'correct') {
          STATE.charStates[i] = 'incorrect';
        }
      }
    }

    const nextStart = nextSpace === -1 ? STATE.testText.length : nextSpace + 1;
    ELEMENTS.testInput.value = STATE.testText.slice(0, nextStart);
    STATE.currentCharIndex = nextStart;
    STATE.wordStartIndex = nextStart;
    STATE.prevInputLength = nextStart;

    updateLiveMetrics();
    renderTextDisplay();

    if (nextStart >= STATE.testText.length) {
      endTest();
    }
  }

  function startTest() {
    if (ELEMENTS.modesPanel)   ELEMENTS.modesPanel.classList.add('panel-hidden');
    if (ELEMENTS.configBar)    ELEMENTS.configBar.classList.add('config-bar--hidden');
    if (ELEMENTS.testStats)    ELEMENTS.testStats.classList.remove('stats-hidden');
    if (ELEMENTS.testArea)   { ELEMENTS.testArea.style.display = ''; ELEMENTS.testArea.classList.add('is-active'); }
    if (ELEMENTS.testHint)     ELEMENTS.testHint.classList.add('hidden');
    bumpUserCounter('testsStarted', 1);
    STATE.isTestActive = true;
    STATE.lastTabPressAt = 0;   // clear Tab+Space combo window so typing Space won't restart
    STATE.testStartTime = Date.now();
    STATE.elapsedTime = 0;
    STATE.correctChars = 0;
    STATE.incorrectChars = 0;
    STATE.correctedChars = 0;
    STATE.wpmHistory = [];
    STATE.rawWpmHistory = [];
    STATE.errorsPerSecond = [];
    STATE.chartMode = 'scale';
    STATE._prevIncorrectCharsSnapshot = 0;
    STATE.prevInputLength = 0;
    STATE.wordStartIndex = 0;

    ELEMENTS.results.style.display = 'none';
    startActiveTimer();

    STATE.wpmSnapshotInterval = setInterval(() => {
      const elapsed = (Date.now() - STATE.testStartTime) / 60000;
      const totalChars = STATE.correctChars + STATE.incorrectChars;
      const wpm = elapsed > 0 ? Math.round((STATE.correctChars / 5) / elapsed) : 0;
      const rawWpm = elapsed > 0 ? Math.round((totalChars / 5) / elapsed) : 0;
      const errorsThisSecond = STATE.incorrectChars - (STATE._prevIncorrectCharsSnapshot || 0);
      STATE._prevIncorrectCharsSnapshot = STATE.incorrectChars;
      STATE.wpmHistory.push(wpm);
      STATE.rawWpmHistory.push(rawWpm);
      STATE.errorsPerSecond.push(Math.max(0, errorsThisSecond));
    }, 1000);

    playSound('start');
  }

  function endTest() {
    if (!STATE.isTestActive) return;

    STATE.isTestActive = false;
    STATE.elapsedTime = Date.now() - STATE.testStartTime;
    clearInterval(STATE.timerInterval);
    clearInterval(STATE.wpmSnapshotInterval);
    ELEMENTS.testInput.disabled = true;
    playSound('end');
    showResults();
  }

  function closeResults() {
    ELEMENTS.results.style.display = 'none';
    if (ELEMENTS.testArea)     ELEMENTS.testArea.style.display = '';
    if (ELEMENTS.shortcutsBar) ELEMENTS.shortcutsBar.style.display = '';
    if (ELEMENTS.modesPanel)   ELEMENTS.modesPanel.classList.add('panel-hidden');
    if (ELEMENTS.configBar)    ELEMENTS.configBar.classList.remove('config-bar--hidden');
    if (ELEMENTS.testStats)    ELEMENTS.testStats.classList.add('stats-hidden');
    rebuildTest();
  }

  function resetTest() {
    if (ELEMENTS.modesPanel) ELEMENTS.modesPanel.classList.add('panel-hidden');
    if (ELEMENTS.configBar)  ELEMENTS.configBar.classList.remove('config-bar--hidden');
    if (ELEMENTS.testStats)  ELEMENTS.testStats.classList.add('stats-hidden');
    STATE.isTestActive = false;
    clearInterval(STATE.timerInterval);
    clearInterval(STATE.wpmSnapshotInterval);

    STATE.currentCharIndex = 0;
    STATE.wordStartIndex = 0;
    STATE.correctChars = 0;
    STATE.incorrectChars = 0;
    STATE.correctedChars = 0;
    STATE.wpmHistory = [];
    STATE.rawWpmHistory = [];
    STATE.errorsPerSecond = [];
    STATE.chartMode = 'scale';
    STATE._prevIncorrectCharsSnapshot = 0;
    STATE.elapsedTime = 0;
    STATE.prevInputLength = 0;
    STATE.charStates = new Array(STATE.testText.length).fill('empty');
    STATE._textLines   = null;
    STATE._activeLineIdx = 0;

    ELEMENTS.testInput.value = '';
    ELEMENTS.results.style.display = 'none';
    if (ELEMENTS.testArea)     ELEMENTS.testArea.style.display = '';
    if (ELEMENTS.shortcutsBar) ELEMENTS.shortcutsBar.style.display = '';
    ELEMENTS.testInput.disabled = false;
    if (ELEMENTS.wpmValue)  ELEMENTS.wpmValue.textContent  = '0';
    if (ELEMENTS.accValue)  ELEMENTS.accValue.textContent  = '100%';
    updateTimerUiForMode();

    // Build the 3-line cinematic text player
    if (ELEMENTS.textTrack) {
      // Defer one tick so the viewport has its final width
      requestAnimationFrame(() => {
        buildTextLines();
        // Caret initial position
        _updateCaret3Line(0);
        ELEMENTS.testInput.focus();
      });
    } else {
      renderTextDisplay();
      ELEMENTS.testInput.focus();
    }

    // Show test area hint
    if (ELEMENTS.testHint) ELEMENTS.testHint.classList.remove('hidden');
    if (ELEMENTS.testArea)  ELEMENTS.testArea.classList.remove('is-active');
  }

  function updateLiveMetrics() {
    STATE.elapsedTime = Math.max(1, Date.now() - STATE.testStartTime);
    const minutes = STATE.elapsedTime / 60000;
    const wpm = minutes > 0 ? Math.round((STATE.correctChars / 5) / minutes) : 0;
    const total = STATE.correctChars + STATE.incorrectChars;
    const acc = total > 0 ? Math.round((STATE.correctChars / total) * 100) : 100;
    ELEMENTS.wpmValue.textContent = wpm;
    ELEMENTS.accValue.textContent = acc + '%';
    if (STATE.currentType === 'texts') {
      ELEMENTS.timerValue.textContent = Math.floor(STATE.elapsedTime / 1000) + 's';
    }
  }

  function showResults() {
    const minutes = Math.max(1, STATE.elapsedTime) / 60000;
    const wpmExact = (STATE.correctChars / 5) / minutes;
    const wpm = Math.round(wpmExact);
    
    // Raw WPM: (todos los caracteres incluendo incorrectos) / tiempo en minutos
    const totalChars = STATE.correctChars + STATE.incorrectChars;
    const rawWpmExact = totalChars / 5 / minutes;
    const rawWpm = Math.round(rawWpmExact);
    
    const acc = totalChars > 0 ? (STATE.correctChars / totalChars) * 100 : 100;
    const accRounded = Math.round(acc);
    
    // Consistencia: usa función centralizada con guards anti-NaN
    const consistency = calculateConsistency(STATE.wpmHistory);
    
    const timeInSeconds = STATE.elapsedTime / 1000;
    const hours = Math.floor(timeInSeconds / 3600);
    const mins = Math.floor((timeInSeconds % 3600) / 60);
    const secs = Math.floor(timeInSeconds % 60);
    const timeFormatted = String(hours).padStart(2, '0') + ':' + String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
    
    // Desglose de caracteres: correct/incorrect/extra/missed
    // En este contexto: correct=STATE.correctChars, incorrect=STATE.incorrectChars, extra=0 (no escribimos más), missed=0 (no aplica)
    const extraChars = 0;
    const missedChars = 0;

    // Actualizar valores grandes
    $('resultWpmBig').textContent = wpm;
    $('resultWpmSmall').textContent = wpmExact.toFixed(2) + ' wpm';
    
    $('resultAccBig').textContent = accRounded + '%';
    $('resultAccSmall').textContent = acc.toFixed(2) + '% ' + STATE.correctChars + ' correct ' + STATE.incorrectChars + ' incorrect';
    
    $('resultRawWpmBig').textContent = rawWpm;
    $('resultRawWpmSmall').textContent = rawWpmExact.toFixed(2) + ' wpm';
    
    $('resultCharsBreakdown').textContent = STATE.correctChars + '/' + STATE.incorrectChars + '/' + extraChars + '/' + missedChars;
    
    $('resultConsistencyBig').textContent = Math.round(consistency) + '%';
    $('resultConsistencySmall').textContent = consistency.toFixed(2) + '%';
    
    $('resultTimeBig').textContent = Math.ceil(timeInSeconds) + 's';
    $('resultTimeSmall').textContent = timeFormatted;
    $('resultTimeExtra').textContent = timeInSeconds.toFixed(2) + 's afk 0%';
    
    $('resultTestType').textContent = STATE.currentType;
    const langDisplay = { es: 'spanish', en: 'english', fr: 'french', de: 'german', pt: 'portuguese' }[STATE.currentLanguage] || STATE.currentLanguage;
    $('resultTestLanguage').textContent = langDisplay;

    // Mostrar/ocultar nota de sesión
    const resultsNote = $('resultsNote');
    if (resultsNote) {
      resultsNote.style.display = STATE.currentUser ? 'none' : 'block';
    }

    // Comprobar récord personal
    const recordBadge = $('newRecordBadge');
    if (recordBadge) recordBadge.style.display = 'none';
    if (STATE.currentUser) {
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      const userData = users[STATE.currentUser.email];
      if (userData && userData.tests && userData.tests.length > 0) {
        const prevBest = userData.tests.reduce((best, t) => Math.max(best, Number(t.wpm || 0)), 0);
        if (wpm > prevBest && recordBadge) {
          recordBadge.style.display = 'inline-block';
          showToast('Nuevo Récord Personal: ' + wpm + ' WPM!', 'ok');
        }
      }
    }

    // Guardar resultado si el usuario está logueado
    if (STATE.currentUser) {
      saveTestResult({
        wpm: wpm,
        rawWpm: rawWpmExact,
        acc: accRounded,
        consistency: consistency,
        chars: STATE.correctChars + STATE.incorrectChars,
        charsCorrect: STATE.correctChars,
        charsIncorrect: STATE.incorrectChars,
        time: Math.ceil(timeInSeconds),
        type: STATE.currentType,
        duration: STATE.currentDuration,
        wordCount: 50,
        language: STATE.currentLanguage,
        difficulty: STATE.currentDifficulty,
        punctuation: STATE.optPunctuation ? 'on' : 'off',
        numbers: STATE.optNumbers ? 'on' : 'off',
        textId: [STATE.currentType, STATE.currentLanguage, STATE.currentDifficulty].join('-'),
        textHash: hashText(STATE.testText),
        replay: {
          timeline: STATE.wpmHistory.slice(),
          finalInputLength: ELEMENTS.testInput && ELEMENTS.testInput.value ? ELEMENTS.testInput.value.length : 0,
          correctedChars: STATE.correctedChars,
          charStates: STATE.charStates.slice(0, Math.min(STATE.charStates.length, 1200))
        },
        wpmHistory: STATE.wpmHistory.slice(),
        appVersion: '1.0',
        textSource: STATE.testText
      });
    }

    // Results are inline — hide test area & shortcuts, show results panel in the same space
    if (ELEMENTS.testArea)     ELEMENTS.testArea.style.display = 'none';
    if (ELEMENTS.shortcutsBar) ELEMENTS.shortcutsBar.style.display = 'none';
    if (ELEMENTS.testStats)    ELEMENTS.testStats.classList.add('stats-hidden');
    if (ELEMENTS.configBar)    ELEMENTS.configBar.classList.remove('config-bar--hidden');
    ELEMENTS.results.style.display = 'block';
    STATE.chartMode = 'scale';
    ELEMENTS.chartModeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === 'scale');
    });
    drawWpmChart(STATE.wpmHistory, 'scale');
  }

  function redrawChart(mode) {
    STATE.chartMode = mode || 'scale';
    // Actualizar estado activo de botones
    document.querySelectorAll('.chart-mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === STATE.chartMode);
    });
    if (STATE.chartMode === 'raw') {
      drawWpmChart(STATE.rawWpmHistory, 'raw');
    } else if (STATE.chartMode === 'errors') {
      drawErrorsChart(STATE.errorsPerSecond);
    } else {
      drawWpmChart(STATE.wpmHistory, 'scale');
    }
  }

  function drawErrorsChart(data) {
    const canvas = ELEMENTS.wpmChart;
    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth || 760;
    canvas.height = 260;
    const W = canvas.width; const H = canvas.height;
    const pad = { top: 24, right: 20, bottom: 44, left: 54 };
    const chartW = W - pad.left - pad.right;
    const chartH = H - pad.top - pad.bottom;
    const style = getComputedStyle(document.body);
    const errColor = style.getPropertyValue('--error-color').trim() || '#ff6b6b';
    const textLight = style.getPropertyValue('--text-light').trim() || '#a8aab5';
    const bgSec = style.getPropertyValue('--bg-secondary').trim() || '#2c2e31';
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = bgSec;
    ctx.fillRect(0, 0, W, H);
    if (!data || data.length === 0) {
      ctx.fillStyle = textLight;
      ctx.font = '13px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Sin errores registrados', W / 2, H / 2);
      return;
    }
    const maxVal = Math.max(...data, 1);
    const barWidth = Math.max(2, (chartW / data.length) - 2);
    data.forEach((val, i) => {
      const x = pad.left + (i / data.length) * chartW;
      const barH = val > 0 ? Math.max(4, (val / maxVal) * chartH) : 0;
      ctx.fillStyle = errColor + 'cc';
      ctx.fillRect(x, pad.top + chartH - barH, barWidth, barH);
    });
    ctx.fillStyle = textLight;
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Errores por segundo', W / 2, H - 6);
  }

  function drawWpmChart(data, mode) {
    const canvas = ELEMENTS.wpmChart;
    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth || 760;
    canvas.height = 260;

    const W = canvas.width;
    const H = canvas.height;
    const pad = { top: 24, right: 20, bottom: 44, left: 54 };
    const chartW = W - pad.left - pad.right;
    const chartH = H - pad.top - pad.bottom;

    const style = getComputedStyle(document.body);
    const accent = style.getPropertyValue('--accent-primary').trim() || '#e2b714';
    const textLight = style.getPropertyValue('--text-light').trim() || '#a8aab5';
    const bgSec = style.getPropertyValue('--bg-secondary').trim() || '#2c2e31';

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = bgSec;
    ctx.fillRect(0, 0, W, H);

    if (!data || data.length < 2) {
      ctx.fillStyle = textLight;
      ctx.font = '13px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Datos insuficientes', W / 2, H / 2);
      return;
    }

    const maxWpm = Math.max(...data, 10);
    const range = maxWpm || 1;
    const gridLines = 5;

    ctx.strokeStyle = 'rgba(255,255,255,0.07)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    for (let i = 0; i <= gridLines; i++) {
      const y = pad.top + (chartH / gridLines) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + chartW, y);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    ctx.fillStyle = textLight;
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.textAlign = 'right';
    for (let i = 0; i <= gridLines; i++) {
      const val = Math.round(maxWpm - (maxWpm / gridLines) * i);
      const y = pad.top + (chartH / gridLines) * i;
      ctx.fillText(val, pad.left - 8, y + 4);
    }

    ctx.fillStyle = textLight;
    ctx.textAlign = 'center';
    const maxLabels = Math.min(data.length, 12);
    const step = Math.max(1, Math.ceil(data.length / maxLabels));
    for (let i = 0; i < data.length; i += step) {
      const x = pad.left + (i / Math.max(data.length - 1, 1)) * chartW;
      ctx.fillText((i + 1) + 's', x, H - 12);
    }
    ctx.fillText(data.length + 's', pad.left + chartW, H - 12);

    const points = data.map((v, i) => ({
      x: pad.left + (i / Math.max(data.length - 1, 1)) * chartW,
      y: pad.top + chartH - (v / range) * chartH
    }));

    const lineColor = (mode === 'raw') ? textLight : accent;
    ctx.beginPath();
    ctx.moveTo(points[0].x, pad.top + chartH);
    points.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(points[points.length - 1].x, pad.top + chartH);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
    grad.addColorStop(0, lineColor + '66');
    grad.addColorStop(1, lineColor + '00');
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    points.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();
  }

  function drawProgressChart(period = '7days') {
    if (!STATE.currentUser) return;

    const canvas = ELEMENTS.progressChart;
    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth || 760;
    canvas.height = 260;

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const userData = users[STATE.currentUser.email];
    if (!userData || !userData.tests || userData.tests.length === 0) {
      ctx.fillStyle = '#a8aab5';
      ctx.font = '13px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Sin datos de tests', canvas.width / 2, canvas.height / 2);
      return;
    }

    const now = new Date();
    const tests = userData.tests.filter(test => {
      const testDate = new Date(test.date);
      const daysAgo = (now - testDate) / (1000 * 60 * 60 * 24);
      
      if (period === '7days') return daysAgo <= 7;
      if (period === '30days') return daysAgo <= 30;
      if (period === '12months') return daysAgo <= 365;
      return true; // alltime
    });

    if (tests.length === 0) {
      ctx.fillStyle = '#a8aab5';
      ctx.font = '13px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Sin datos para este período', canvas.width / 2, canvas.height / 2);
      return;
    }

    let groupedData = {};
    let labels = [];

    if (period === '7days') {
      // Agrupar por día
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const key = date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
        groupedData[key] = [];
        labels.push(key);
      }
    } else if (period === '30days') {
      // Agrupar por semana
      for (let i = 4; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - (i * 7));
        const key = 'Sem ' + Math.floor(date.getDate() / 7 + 1);
        groupedData[key] = [];
        labels.push(key);
      }
    } else if (period === '12months') {
      // Agrupar por mes
      for (let i = 11; i >= 0; i--) {
        const date = new Date(now);
        date.setMonth(date.getMonth() - i);
        const key = date.toLocaleDateString('es-ES', { month: 'short', year: '2-digit' });
        groupedData[key] = [];
        labels.push(key);
      }
    } else {
      // Agrupar por año
      const yearsSet = new Set();
      tests.forEach(test => {
        const year = new Date(test.date).getFullYear();
        yearsSet.add(year);
      });
      const years = Array.from(yearsSet).sort();
      years.forEach(year => {
        groupedData[year] = [];
        labels.push(year);
      });
    }

    // Llenar datos
    tests.forEach(test => {
      const testDate = new Date(test.date);
      let key;

      if (period === '7days') {
        key = testDate.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
      } else if (period === '30days') {
        key = 'Sem ' + Math.floor(testDate.getDate() / 7 + 1);
      } else if (period === '12months') {
        key = testDate.toLocaleDateString('es-ES', { month: 'short', year: '2-digit' });
      } else {
        key = testDate.getFullYear();
      }

      if (groupedData[key]) {
        groupedData[key].push(test.wpm);
      }
    });

    // Calcular promedios
    const data = labels.map(label => {
      const wpmValues = groupedData[label];
      return wpmValues.length > 0 ? Math.round(wpmValues.reduce((a, b) => a + b, 0) / wpmValues.length) : 0;
    });

    // Dibujar gráfica
    const W = canvas.width;
    const H = canvas.height;
    const pad = { top: 24, right: 20, bottom: 44, left: 54 };
    const chartW = W - pad.left - pad.right;
    const chartH = H - pad.top - pad.bottom;

    const style = getComputedStyle(document.body);
    const accent = style.getPropertyValue('--accent-primary').trim() || '#e2b714';
    const textLight = style.getPropertyValue('--text-light').trim() || '#a8aab5';
    const bgSec = style.getPropertyValue('--bg-secondary').trim() || '#2c2e31';

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = bgSec;
    ctx.fillRect(0, 0, W, H);

    const maxWpm = Math.max(...data, 10);
    const range = maxWpm || 1;
    const gridLines = 5;

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.07)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    for (let i = 0; i <= gridLines; i++) {
      const y = pad.top + (chartH / gridLines) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + chartW, y);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Y-axis labels
    ctx.fillStyle = textLight;
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.textAlign = 'right';
    for (let i = 0; i <= gridLines; i++) {
      const val = Math.round(maxWpm - (maxWpm / gridLines) * i);
      const y = pad.top + (chartH / gridLines) * i;
      ctx.fillText(val, pad.left - 8, y + 4);
    }

    // X-axis labels
    ctx.fillStyle = textLight;
    ctx.textAlign = 'center';
    for (let i = 0; i < labels.length; i++) {
      const x = pad.left + (i / Math.max(labels.length - 1, 1)) * chartW;
      ctx.fillText(labels[i], x, H - 12);
    }

    // Dibujar línea
    const points = data.map((v, i) => ({
      x: pad.left + (i / Math.max(data.length - 1, 1)) * chartW,
      y: pad.top + chartH - (v / range) * chartH
    }));

    ctx.beginPath();
    ctx.moveTo(points[0].x, pad.top + chartH);
    points.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(points[points.length - 1].x, pad.top + chartH);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
    grad.addColorStop(0, accent + '66');
    grad.addColorStop(1, accent + '00');
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    points.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();
  }

  function initVersusUI() {
    STATE.versus.modeType = ELEMENTS.versusModeType ? ELEMENTS.versusModeType.value : 'time';
    STATE.versus.duration = ELEMENTS.versusTimeSelect ? parseInt(ELEMENTS.versusTimeSelect.value, 10) || 60 : 60;
    STATE.versus.wordCount = ELEMENTS.versusWordsSelect ? parseInt(ELEMENTS.versusWordsSelect.value, 10) || 50 : 50;
    STATE.versus.language = ELEMENTS.versusLanguage ? ELEMENTS.versusLanguage.value : 'es';
    STATE.versus.difficulty = ELEMENTS.versusDifficulty ? ELEMENTS.versusDifficulty.value : '1k';
    STATE.versus.botDifficulty = ELEMENTS.versusBotDifficulty ? ELEMENTS.versusBotDifficulty.value : 'medium';
    updateVersusModeUi();
    refreshVersusObjectiveUi();
    syncVersusNamesAndRanks();
    updateVersusLiveUi();
  }

  function updateVersusModeUi() {
    const isTime = STATE.versus.modeType === 'time';
    if (ELEMENTS.versusTimeGroup) ELEMENTS.versusTimeGroup.style.display = isTime ? 'flex' : 'none';
    if (ELEMENTS.versusWordsGroup) ELEMENTS.versusWordsGroup.style.display = isTime ? 'none' : 'flex';
    refreshVersusObjectiveUi();
  }

  function refreshVersusObjectiveUi() {
    if (!ELEMENTS.versusObjective) return;
    if (STATE.versus.modeType === 'time') {
      ELEMENTS.versusObjective.textContent = 'Tiempo ' + STATE.versus.duration + 's';
    } else {
      ELEMENTS.versusObjective.textContent = 'Palabras ' + STATE.versus.wordCount;
    }
  }

  function applyVersusConfigToControls(config) {
    if (!config) return;
    if (ELEMENTS.versusModeType) ELEMENTS.versusModeType.value = config.modeType;
    if (ELEMENTS.versusTimeSelect) ELEMENTS.versusTimeSelect.value = String(config.duration);
    if (ELEMENTS.versusWordsSelect) ELEMENTS.versusWordsSelect.value = String(config.wordCount);
    if (ELEMENTS.versusLanguage) ELEMENTS.versusLanguage.value = config.language;
    if (ELEMENTS.versusDifficulty) ELEMENTS.versusDifficulty.value = config.difficulty;
    if (ELEMENTS.versusBotDifficulty) ELEMENTS.versusBotDifficulty.value = config.botDifficulty;
    STATE.versus.modeType = config.modeType;
    STATE.versus.duration = config.duration;
    STATE.versus.wordCount = config.wordCount;
    STATE.versus.language = config.language;
    STATE.versus.difficulty = config.difficulty;
    STATE.versus.botDifficulty = config.botDifficulty;
    updateVersusModeUi();
  }

  function createVersusConfigFromControls() {
    return {
      modeType: ELEMENTS.versusModeType ? ELEMENTS.versusModeType.value : 'time',
      duration: ELEMENTS.versusTimeSelect ? parseInt(ELEMENTS.versusTimeSelect.value, 10) || 60 : 60,
      wordCount: ELEMENTS.versusWordsSelect ? parseInt(ELEMENTS.versusWordsSelect.value, 10) || 50 : 50,
      language: ELEMENTS.versusLanguage ? ELEMENTS.versusLanguage.value : 'es',
      difficulty: ELEMENTS.versusDifficulty ? ELEMENTS.versusDifficulty.value : '1k',
      botDifficulty: ELEMENTS.versusBotDifficulty ? ELEMENTS.versusBotDifficulty.value : 'medium'
    };
  }

  function createWordsByConfig(language, difficulty, targetWords) {
    const langBank = WORD_BANKS[language] || WORD_BANKS.es;
    const bank = langBank[difficulty] || langBank['1k'];
    const words = [];
    for (let i = 0; i < targetWords; i++) {
      words.push(bank[Math.floor(Math.random() * bank.length)]);
    }
    return words.join(' ');
  }

  function createMatch(config) {
    STATE.versus.netStub.queueState = 'matched-local';
    STATE.versus.netStub.roomId = 'local-' + Date.now();
    return {
      id: STATE.versus.netStub.roomId,
      createdAt: Date.now(),
      mode: 'versus-bot',
      opponent: 'bot',
      config: config
    };
  }

  function updateRemotePlayerState(snapshot) {
    STATE.versus.netStub.remoteSnapshot = snapshot;
    applyBotSnapshot(snapshot);
  }

  function onMatchFinished(result) {
    showVersusResultsModal(result);
  }

  function startVersusMatch(isRematch) {
    if (STATE.versus.isActive || STATE.versus.inCountdown) return;

    const config = isRematch && STATE.versus.lastConfig
      ? STATE.versus.lastConfig
      : createVersusConfigFromControls();
    applyVersusConfigToControls(config);

    const match = createMatch(config);
    STATE.versus.matchMeta = match;
    STATE.versus.lastConfig = config;

    const sharedText = config.modeType === 'words'
      ? createWordsByConfig(config.language, config.difficulty, config.wordCount)
      : createWordsByConfig(config.language, config.difficulty, 220);

    STATE.versus.sharedText = sharedText;
    STATE.versus.status = 'ready';
    STATE.versus.timeLeft = config.duration;
    STATE.versus.elapsedMs = 0;
    resetVersusParticipants(sharedText);
    syncVersusNamesAndRanks();
    updateVersusLiveUi();
    renderVersusText('user');
    renderVersusText('bot');
    updateVersusCaretPosition();
    showVersusLoginHintIfNeeded();
    runVersusCountdownThenStart();
  }

  function resetVersusParticipants(sharedText) {
    const p = STATE.versus.player;
    p.currentCharIndex = 0;
    p.wordStartIndex = 0;
    p.correctChars = 0;
    p.incorrectChars = 0;
    p.correctedChars = 0;
    p.prevInputLength = 0;
    p.wpmHistory = [];
    p.charStates = new Array(sharedText.length).fill('empty');

    const b = STATE.versus.bot;
    b.currentCharIndex = 0;
    b.correctChars = 0;
    b.incorrectChars = 0;
    b.correctedChars = 0;
    b.wpmHistory = [];
    b.pendingCorrections = [];
    b.pauseUntil = 0;
    b.fractionalCarry = 0;
    b.charStates = new Array(sharedText.length).fill('empty');
    b.mood = 'calentando';

    if (ELEMENTS.versusInput) {
      ELEMENTS.versusInput.value = '';
      ELEMENTS.versusInput.disabled = true;
    }
  }

  function runVersusCountdownThenStart() {
    STATE.versus.inCountdown = true;
    STATE.versus.countdownValue = '3';
    if (ELEMENTS.versusMatchStatus) ELEMENTS.versusMatchStatus.textContent = 'Preparando duelo';
    if (ELEMENTS.versusCountdown) ELEMENTS.versusCountdown.textContent = '3';
    if (ELEMENTS.versusCountdownOverlay) ELEMENTS.versusCountdownOverlay.style.display = 'flex';
    if (ELEMENTS.versusCountdownNumber) ELEMENTS.versusCountdownNumber.textContent = '3';

    let count = 3;
    STATE.versus.countdownInterval = setInterval(() => {
      count -= 1;
      if (count > 0) {
        STATE.versus.countdownValue = String(count);
        if (ELEMENTS.versusCountdown) ELEMENTS.versusCountdown.textContent = String(count);
        if (ELEMENTS.versusCountdownNumber) ELEMENTS.versusCountdownNumber.textContent = String(count);
      } else if (count === 0) {
        STATE.versus.countdownValue = 'GO';
        if (ELEMENTS.versusCountdown) ELEMENTS.versusCountdown.textContent = 'GO';
        if (ELEMENTS.versusCountdownNumber) ELEMENTS.versusCountdownNumber.textContent = 'GO';
      } else {
        clearInterval(STATE.versus.countdownInterval);
        STATE.versus.countdownInterval = null;
        STATE.versus.inCountdown = false;
        if (ELEMENTS.versusCountdownOverlay) ELEMENTS.versusCountdownOverlay.style.display = 'none';
        startVersusLoops();
      }
    }, 700);
  }

  function startVersusLoops() {
    STATE.versus.isActive = true;
    STATE.versus.status = 'running';
    STATE.versus.matchStartAt = Date.now();
    if (ELEMENTS.versusMatchStatus) ELEMENTS.versusMatchStatus.textContent = 'En curso';
    if (ELEMENTS.versusInput) {
      ELEMENTS.versusInput.disabled = false;
      ELEMENTS.versusInput.focus();
    }

    STATE.versus.timerInterval = setInterval(() => {
      STATE.versus.elapsedMs = Date.now() - STATE.versus.matchStartAt;
      if (STATE.versus.modeType === 'time') {
        const rem = Math.max(0, Math.ceil((STATE.versus.duration * 1000 - STATE.versus.elapsedMs) / 1000));
        STATE.versus.timeLeft = rem;
        if (ELEMENTS.versusObjective) ELEMENTS.versusObjective.textContent = 'Tiempo restante ' + rem + 's';
        if (rem === 0) {
          finishVersusMatch('time-up');
        }
      } else {
        const userWordsLeft = countWordsRemaining(STATE.versus.sharedText, STATE.versus.player.currentCharIndex);
        if (ELEMENTS.versusObjective) ELEMENTS.versusObjective.textContent = 'Palabras restantes ' + userWordsLeft;
      }
    }, 120);

    STATE.versus.userSnapshotInterval = setInterval(() => {
      captureVersusWpmSnapshots();
      updateVersusLiveUi();
      maybeFinishByCompletion();
    }, 1000);

    STATE.versus.botInterval = setInterval(() => {
      tickBotSimulation();
    }, 120);

    STATE.versus.pingInterval = setInterval(() => {
      STATE.versus.ping = 28 + Math.floor(Math.random() * 46);
      if (ELEMENTS.versusPing) ELEMENTS.versusPing.textContent = 'Ping ' + STATE.versus.ping + 'ms';
    }, 1300);

    STATE.versus.botMoodInterval = setInterval(() => {
      updateBotMood();
    }, 1800);
  }

  function captureVersusWpmSnapshots() {
    const minutes = Math.max(1, STATE.versus.elapsedMs) / 60000;
    const userWpm = Math.round((STATE.versus.player.correctChars / 5) / minutes);
    const botWpm = Math.round((STATE.versus.bot.correctChars / 5) / minutes);
    STATE.versus.player.wpmHistory.push(Number.isFinite(userWpm) ? userWpm : 0);
    STATE.versus.bot.wpmHistory.push(Number.isFinite(botWpm) ? botWpm : 0);
  }

  function tickBotSimulation() {
    if (!STATE.versus.isActive) return;

    const profile = BOT_PROFILES[STATE.versus.botDifficulty] || BOT_PROFILES.medium;
    const bot = STATE.versus.bot;
    const now = Date.now();
    if (now < bot.pauseUntil) return;

    if (Math.random() < 0.07) {
      bot.pauseUntil = now + (200 + Math.floor(Math.random() * 600));
      return;
    }

    const targetWpm = profile.minWpm + Math.random() * (profile.maxWpm - profile.minWpm);
    const swing = 1 + ((Math.random() * 2 - 1) * profile.variance);
    const charsPerSecond = Math.max(1, (targetWpm * 5 / 60) * swing);
    const charsPerTick = (charsPerSecond * 0.12) + bot.fractionalCarry;
    const fullChars = Math.floor(charsPerTick);
    bot.fractionalCarry = charsPerTick - fullChars;

    for (let i = 0; i < Math.max(1, fullChars); i++) {
      if (bot.currentCharIndex >= STATE.versus.sharedText.length) break;
      const idx = bot.currentCharIndex;
      const expected = STATE.versus.sharedText[idx];
      const targetAcc = profile.minAcc + Math.random() * (profile.maxAcc - profile.minAcc);
      const isError = expected !== ' ' && (Math.random() * 100) > targetAcc;

      if (isError) {
        applyVersusCharTyping(bot, idx, '#', expected, true);
        bot.pendingCorrections.push(idx);
      } else {
        applyVersusCharTyping(bot, idx, expected, expected, true);
      }
      bot.currentCharIndex += 1;

      if (bot.pendingCorrections.length && Math.random() < 0.32) {
        const cidx = bot.pendingCorrections.shift();
        if (typeof cidx === 'number' && cidx < bot.currentCharIndex) {
          applyVersusCorrection(bot, cidx);
        }
      }
    }

    const snapshot = {
      currentCharIndex: bot.currentCharIndex,
      correctChars: bot.correctChars,
      incorrectChars: bot.incorrectChars,
      correctedChars: bot.correctedChars,
      charStates: bot.charStates.slice(),
      mood: bot.mood
    };
    updateRemotePlayerState(snapshot);
    maybeFinishByCompletion();
  }

  function applyBotSnapshot(snapshot) {
    if (!snapshot) return;
    const bot = STATE.versus.bot;
    bot.currentCharIndex = snapshot.currentCharIndex;
    bot.correctChars = snapshot.correctChars;
    bot.incorrectChars = snapshot.incorrectChars;
    bot.correctedChars = snapshot.correctedChars;
    bot.charStates = snapshot.charStates;
    bot.mood = snapshot.mood || bot.mood;
    renderVersusText('bot');
    updateVersusLiveUi();
  }

  function applyVersusCharTyping(sideState, pos, typed, expected, isBot) {
    if (typed === expected) {
      if (sideState.charStates[pos] === 'incorrect' || sideState.charStates[pos] === 'bot-pending') {
        sideState.incorrectChars = Math.max(0, sideState.incorrectChars - 1);
        sideState.correctedChars += 1;
      } else if (sideState.charStates[pos] !== 'correct') {
        sideState.correctChars += 1;
      }
      sideState.charStates[pos] = 'correct';
      return;
    }

    if (sideState.charStates[pos] === 'correct') {
      sideState.correctChars = Math.max(0, sideState.correctChars - 1);
      sideState.incorrectChars += 1;
    } else if (sideState.charStates[pos] !== 'incorrect' && sideState.charStates[pos] !== 'bot-pending') {
      sideState.incorrectChars += 1;
    }
    sideState.charStates[pos] = isBot ? 'bot-pending' : 'incorrect';
  }

  function applyVersusCorrection(sideState, pos) {
    if (pos < 0 || pos >= sideState.charStates.length) return;
    if (sideState.charStates[pos] === 'bot-pending' || sideState.charStates[pos] === 'incorrect') {
      sideState.incorrectChars = Math.max(0, sideState.incorrectChars - 1);
      sideState.correctedChars += 1;
      if (sideState.charStates[pos] !== 'correct') sideState.correctChars += 1;
      sideState.charStates[pos] = 'correct';
    }
  }

  function handleVersusInput() {
    if (!STATE.versus.isActive) return;
    const player = STATE.versus.player;
    const input = ELEMENTS.versusInput.value;
    const newLen = input.length;

    if (newLen > STATE.versus.sharedText.length) {
      ELEMENTS.versusInput.value = input.slice(0, STATE.versus.sharedText.length);
      return;
    }

    if (newLen > player.prevInputLength) {
      const pos = newLen - 1;
      const typed = input[pos];
      const expected = STATE.versus.sharedText[pos];
      applyVersusCharTyping(player, pos, typed, expected, false);
      player.currentCharIndex = newLen;
    } else if (newLen < player.prevInputLength) {
      const removedPos = player.prevInputLength - 1;
      rollbackVersusChar(player, removedPos);
      player.currentCharIndex = newLen;
      player.wordStartIndex = Math.min(player.wordStartIndex, newLen);
    }

    player.prevInputLength = newLen;
    renderVersusText('user');
    updateVersusLiveUi();
    maybeFinishByCompletion();
  }

  function rollbackVersusChar(sideState, pos) {
    if (pos < 0 || pos >= sideState.charStates.length) return;
    if (sideState.charStates[pos] === 'correct') {
      sideState.correctChars = Math.max(0, sideState.correctChars - 1);
    } else if (sideState.charStates[pos] === 'incorrect' || sideState.charStates[pos] === 'bot-pending') {
      sideState.incorrectChars = Math.max(0, sideState.incorrectChars - 1);
      sideState.correctedChars += 1;
    }
    sideState.charStates[pos] = 'empty';
  }

  function renderVersusText(side) {
    const isUser = side === 'user';
    const targetEl = isUser ? ELEMENTS.versusUserText : ELEMENTS.versusBotText;
    const state = isUser ? STATE.versus.player : STATE.versus.bot;
    if (!targetEl || !STATE.versus.sharedText) return;
    let html = '';
    for (let i = 0; i < STATE.versus.sharedText.length; i++) {
      const char = STATE.versus.sharedText[i];
      let className = '';
      if (state.charStates[i] === 'correct') className = 'correct';
      if (state.charStates[i] === 'incorrect' || state.charStates[i] === 'bot-pending') className = 'incorrect';
      const currentClass = isUser && i === state.currentCharIndex ? ' current' : '';
      html += '<span data-i="' + i + '" class="' + className + currentClass + '">' + escapeHtml(char) + '</span>';
    }
    targetEl.innerHTML = html;
    if (isUser) updateVersusCaretPosition();
  }

  function updateVersusCaretPosition() {
    if (!ELEMENTS.versusUserCaret || !ELEMENTS.versusUserText || !ELEMENTS.versusUserArea) return;
    const idx = STATE.versus.player.currentCharIndex;
    if (idx >= STATE.versus.sharedText.length || !STATE.versus.isActive) {
      ELEMENTS.versusUserCaret.style.opacity = '0';
      return;
    }
    const charEl = ELEMENTS.versusUserText.querySelector('[data-i="' + idx + '"]');
    if (!charEl) return;
    const areaRect = ELEMENTS.versusUserArea.getBoundingClientRect();
    const charRect = charEl.getBoundingClientRect();
    const x = charRect.left - areaRect.left;
    const y = charRect.top - areaRect.top + (charRect.height * 0.08);
    const h = Math.max(12, charRect.height * 0.84);
    ELEMENTS.versusUserCaret.style.opacity = '1';
    ELEMENTS.versusUserCaret.style.left = x + 'px';
    ELEMENTS.versusUserCaret.style.top = y + 'px';
    ELEMENTS.versusUserCaret.style.height = h + 'px';
    charEl.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
  }

  function calculateConsistency(history) {
    if (!history || history.length < 2) return 100;
    const avg = history.reduce((a, b) => a + b, 0) / history.length;
    if (avg <= 0) return 0;
    const variance = history.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / history.length;
    const stdDev = Math.sqrt(variance);
    const result = Math.max(0, Math.min(100, 100 - (stdDev / avg * 100)));
    return isFinite(result) ? result : 0;
  }

  function getVersusSideMetrics(sideState, elapsedMs) {
    const minutes = Math.max(1, elapsedMs) / 60000;
    const totalChars = sideState.correctChars + sideState.incorrectChars;
    const wpm = Math.round((sideState.correctChars / 5) / minutes);
    const acc = totalChars > 0 ? (sideState.correctChars / totalChars) * 100 : 100;
    return {
      wpm: Number.isFinite(wpm) ? wpm : 0,
      wpmExact: (sideState.correctChars / 5) / minutes,
      acc: acc,
      progress: STATE.versus.sharedText.length > 0 ? (sideState.currentCharIndex / STATE.versus.sharedText.length) * 100 : 0,
      consistency: calculateConsistency(sideState.wpmHistory)
    };
  }

  function updateVersusLiveUi() {
    const u = getVersusSideMetrics(STATE.versus.player, Math.max(1, STATE.versus.elapsedMs));
    const b = getVersusSideMetrics(STATE.versus.bot, Math.max(1, STATE.versus.elapsedMs));
    if (ELEMENTS.versusUserWpm) ELEMENTS.versusUserWpm.textContent = String(u.wpm);
    if (ELEMENTS.versusUserAcc) ELEMENTS.versusUserAcc.textContent = 'ACC ' + Math.round(u.acc) + '%';
    if (ELEMENTS.versusUserConsistency) ELEMENTS.versusUserConsistency.textContent = 'Consistencia: ' + Math.round(u.consistency) + '%';
    if (ELEMENTS.versusUserProgress) ELEMENTS.versusUserProgress.style.width = Math.min(100, u.progress) + '%';

    if (ELEMENTS.versusBotWpm) ELEMENTS.versusBotWpm.textContent = String(b.wpm);
    if (ELEMENTS.versusBotAcc) ELEMENTS.versusBotAcc.textContent = 'ACC ' + Math.round(b.acc) + '%';
    if (ELEMENTS.versusBotConsistency) ELEMENTS.versusBotConsistency.textContent = 'Consistencia: ' + Math.round(b.consistency) + '%';
    if (ELEMENTS.versusBotProgress) ELEMENTS.versusBotProgress.style.width = Math.min(100, b.progress) + '%';

    if (ELEMENTS.versusBotMood) ELEMENTS.versusBotMood.textContent = STATE.versus.bot.mood;
  }

  function countWordsRemaining(text, charIndex) {
    if (!text) return 0;
    const typed = text.slice(0, charIndex).trim();
    const typedWords = typed ? typed.split(/\s+/).length : 0;
    const totalWords = text.trim().split(/\s+/).length;
    return Math.max(0, totalWords - typedWords);
  }

  function maybeFinishByCompletion() {
    const userDone = STATE.versus.player.currentCharIndex >= STATE.versus.sharedText.length;
    const botDone = STATE.versus.bot.currentCharIndex >= STATE.versus.sharedText.length;
    if (STATE.versus.modeType === 'words' && userDone && botDone) {
      finishVersusMatch('completed-both');
      return;
    }
    if (STATE.versus.modeType === 'time' && userDone && botDone) {
      finishVersusMatch('completed-both');
    }
  }

  function updateBotMood() {
    const bot = STATE.versus.bot;
    const metrics = getVersusSideMetrics(bot, Math.max(1, STATE.versus.elapsedMs));
    if (metrics.acc < 85) {
      bot.mood = 'tilt';
    } else if (metrics.wpm > 120) {
      bot.mood = 'en racha';
    } else if (metrics.wpm > 70) {
      bot.mood = 'concentrado';
    } else {
      bot.mood = BOT_MOODS[Math.floor(Math.random() * BOT_MOODS.length)];
    }
    if (ELEMENTS.versusBotMood) ELEMENTS.versusBotMood.textContent = bot.mood;
  }

  function finishVersusMatch(reason) {
    if (!STATE.versus.isActive) return;
    stopVersusMatch('finished');

    const elapsed = Math.max(1, STATE.versus.elapsedMs);
    const userMetrics = getVersusSideMetrics(STATE.versus.player, elapsed);
    const botMetrics = getVersusSideMetrics(STATE.versus.bot, elapsed);
    const diff = userMetrics.wpm - botMetrics.wpm;
    let outcome = 'draw';
    if (diff > 0) outcome = 'win';
    if (diff < 0) outcome = 'lose';

    const result = {
      reason: reason,
      outcome: outcome,
      diff: diff,
      user: {
        wpm: userMetrics.wpm,
        wpmExact: userMetrics.wpmExact,
        acc: userMetrics.acc,
        consistency: userMetrics.consistency,
        history: STATE.versus.player.wpmHistory.slice()
      },
      bot: {
        wpm: botMetrics.wpm,
        wpmExact: botMetrics.wpmExact,
        acc: botMetrics.acc,
        consistency: botMetrics.consistency,
        history: STATE.versus.bot.wpmHistory.slice()
      },
      config: { ...STATE.versus.lastConfig }
    };

    STATE.versus.lastResult = result;
    persistVersusResult(result);
    onMatchFinished(result);
  }

  function stopVersusMatch(status) {
    STATE.versus.isActive = false;
    STATE.versus.inCountdown = false;
    STATE.versus.status = status;
    clearInterval(STATE.versus.timerInterval);
    clearInterval(STATE.versus.countdownInterval);
    clearInterval(STATE.versus.userSnapshotInterval);
    clearInterval(STATE.versus.botInterval);
    clearInterval(STATE.versus.pingInterval);
    clearInterval(STATE.versus.botMoodInterval);
    STATE.versus.timerInterval = null;
    STATE.versus.countdownInterval = null;
    STATE.versus.userSnapshotInterval = null;
    STATE.versus.botInterval = null;
    STATE.versus.pingInterval = null;
    STATE.versus.botMoodInterval = null;
    if (ELEMENTS.versusInput) ELEMENTS.versusInput.disabled = true;
    if (ELEMENTS.versusMatchStatus) {
      ELEMENTS.versusMatchStatus.textContent = status === 'finished' ? 'Finalizado' : 'En espera';
    }
    if (ELEMENTS.versusCountdown) ELEMENTS.versusCountdown.textContent = '-';
    if (ELEMENTS.versusCountdownOverlay) ELEMENTS.versusCountdownOverlay.style.display = 'none';
    updateVersusCaretPosition();
  }

  function showVersusResultsModal(result) {
    if (!ELEMENTS.versusResultsModal || !ELEMENTS.versusModalOverlay) return;
    const titleByOutcome = {
      win: 'Has ganado',
      lose: 'Has perdido',
      draw: 'Empate'
    };
    const flavorByOutcome = {
      win: 'Gran ritmo y control. El bot no pudo seguirte el paso.',
      lose: 'Buena pelea. Ajusta precisión o ritmo para la revancha.',
      draw: 'Duelo muy parejo. Una revancha puede definir al ganador.'
    };
    const diffPrefix = result.diff >= 0 ? '+' : '';

    if (ELEMENTS.versusResultTitle) ELEMENTS.versusResultTitle.textContent = titleByOutcome[result.outcome] || 'Empate';
    if (ELEMENTS.versusResultFlavor) ELEMENTS.versusResultFlavor.textContent = flavorByOutcome[result.outcome] || flavorByOutcome.draw;
    if (ELEMENTS.versusResultUserWpm) ELEMENTS.versusResultUserWpm.textContent = String(result.user.wpm);
    if (ELEMENTS.versusResultUserAcc) ELEMENTS.versusResultUserAcc.textContent = 'ACC ' + result.user.acc.toFixed(2) + '%';
    if (ELEMENTS.versusResultBotWpm) ELEMENTS.versusResultBotWpm.textContent = String(result.bot.wpm);
    if (ELEMENTS.versusResultBotAcc) ELEMENTS.versusResultBotAcc.textContent = 'ACC ' + result.bot.acc.toFixed(2) + '%';
    if (ELEMENTS.versusResultDiff) ELEMENTS.versusResultDiff.textContent = diffPrefix + result.diff + ' WPM';
    if (ELEMENTS.versusResultMeta) ELEMENTS.versusResultMeta.textContent = 'Bot ' + (result.config ? result.config.botDifficulty : STATE.versus.botDifficulty);

    ELEMENTS.versusModalOverlay.style.display = 'block';
    ELEMENTS.versusResultsModal.style.display = 'block';
    drawVersusWpmChart(result.user.history, result.bot.history);
  }

  function closeVersusResultsModal() {
    if (ELEMENTS.versusModalOverlay) ELEMENTS.versusModalOverlay.style.display = 'none';
    if (ELEMENTS.versusResultsModal) ELEMENTS.versusResultsModal.style.display = 'none';
  }

  function drawVersusWpmChart(userData, botData) {
    const canvas = ELEMENTS.versusWpmChart;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth || 760;
    canvas.height = 220;

    const W = canvas.width;
    const H = canvas.height;
    const pad = { top: 20, right: 20, bottom: 34, left: 46 };
    const chartW = W - pad.left - pad.right;
    const chartH = H - pad.top - pad.bottom;
    const style = getComputedStyle(document.body);
    const accent = style.getPropertyValue('--accent-primary').trim() || '#e2b714';
    const botColor = style.getPropertyValue('--error-color').trim() || '#ff6b6b';
    const textLight = style.getPropertyValue('--text-light').trim() || '#a8aab5';
    const bgSec = style.getPropertyValue('--bg-secondary').trim() || '#2c2e31';

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = bgSec;
    ctx.fillRect(0, 0, W, H);

    const len = Math.max(userData.length, botData.length, 2);
    const u = [...userData];
    const b = [...botData];
    while (u.length < len) u.push(u.length ? u[u.length - 1] : 0);
    while (b.length < len) b.push(b.length ? b[b.length - 1] : 0);

    const maxVal = Math.max(10, ...u, ...b);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.setLineDash([3, 4]);
    for (let i = 0; i < 5; i++) {
      const y = pad.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + chartW, y);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    ctx.fillStyle = textLight;
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.textAlign = 'right';
    for (let i = 0; i < 5; i++) {
      const val = Math.round(maxVal - ((maxVal / 4) * i));
      const y = pad.top + (chartH / 4) * i;
      ctx.fillText(String(val), pad.left - 6, y + 3);
    }

    function drawLine(values, color) {
      ctx.beginPath();
      values.forEach((v, i) => {
        const x = pad.left + (i / Math.max(1, values.length - 1)) * chartW;
        const y = pad.top + chartH - (v / maxVal) * chartH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.2;
      ctx.stroke();
    }

    drawLine(u, accent);
    drawLine(b, botColor);
  }

  function persistVersusResult(result) {
    if (!STATE.currentUser) {
      showVersusLoginHintIfNeeded();
      return;
    }

    saveTestResult({
      wpm: result.user.wpm,
      rawWpm: result.user.wpmExact,
      acc: Math.round(result.user.acc),
      consistency: result.user.consistency,
      chars: STATE.versus.player.correctChars + STATE.versus.player.incorrectChars,
      charsCorrect: STATE.versus.player.correctChars,
      charsIncorrect: STATE.versus.player.incorrectChars,
      time: Math.ceil(Math.max(1, STATE.versus.elapsedMs) / 1000),
      type: result.config.modeType,
      mode: 'versus-bot',
      versusOutcome: result.outcome,
      duration: result.config.duration,
      wordCount: result.config.wordCount,
      language: result.config.language,
      difficulty: result.config.difficulty,
      botDifficulty: result.config.botDifficulty,
      punctuation: 'off',
      numbers: 'off',
      tags: ['versus', 'bot'],
      textId: ['versus', result.config.language, result.config.difficulty].join('-'),
      textHash: hashText(STATE.versus.sharedText),
      replay: {
        userTimeline: result.user.history,
        botTimeline: result.bot.history,
        elapsedMs: STATE.versus.elapsedMs,
        reason: result.reason
      },
      wpmHistory: result.user.history,
      appVersion: '1.0',
      textSource: STATE.versus.sharedText
    });

    displayProfile();
  }

  function showVersusLoginHintIfNeeded() {
    if (!ELEMENTS.versusLoginHint) return;
    ELEMENTS.versusLoginHint.style.display = STATE.currentUser ? 'none' : 'block';
  }

  function syncVersusNamesAndRanks() {
    const username = STATE.currentUser ? STATE.currentUser.username : 'Invitado';
    if (ELEMENTS.versusUserName) ELEMENTS.versusUserName.textContent = username;
    if (ELEMENTS.versusBotName) ELEMENTS.versusBotName.textContent = 'TypeBot';

    const userMeanWpm = getUserAverageWpm();
    const botProfile = BOT_PROFILES[STATE.versus.botDifficulty] || BOT_PROFILES.medium;
    const botMeanWpm = Math.round((botProfile.minWpm + botProfile.maxWpm) / 2);
    if (ELEMENTS.versusUserRank) ELEMENTS.versusUserRank.textContent = rankByWpm(userMeanWpm);
    if (ELEMENTS.versusBotRank) ELEMENTS.versusBotRank.textContent = rankByWpm(botMeanWpm);
    updateVersusEliteBadge(buildCompetitiveSnapshot().isTop100);
  }

  function getUserAverageWpm() {
    if (!STATE.currentUser) return 55;
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const user = users[STATE.currentUser.email];
    const tests = user && user.tests ? user.tests : [];
    if (!tests.length) return 55;
    return tests.reduce((s, t) => s + Number(t.wpm || 0), 0) / tests.length;
  }

  function rankByWpm(wpm) {
    if (wpm < 55) return 'Bronce';
    if (wpm < 85) return 'Plata';
    if (wpm < 115) return 'Oro';
    if (wpm < 145) return 'Platino';
    return 'Diamante';
  }

  function getLanguageStorageKey() {
    return 'typehubLanguagesBeta';
  }

  function defaultLanguagesProfile() {
    return {
      xpByTarget: { es: 0, en: 0, fr: 0 },
      gems: 0,
      completedLessons: {},
      categoryRewards: {},
      preferences: { base: 'es', target: 'en' }
    };
  }

  function initLanguagesBeta() {
    const raw = localStorage.getItem(getLanguageStorageKey());
    let parsed = null;
    if (raw) {
      try {
        parsed = JSON.parse(raw);
      } catch (_) {
        parsed = null;
      }
    }
    STATE.languages.profile = parsed ? { ...defaultLanguagesProfile(), ...parsed } : defaultLanguagesProfile();
    STATE.languages.base = STATE.languages.profile.preferences.base || 'es';
    STATE.languages.target = STATE.languages.profile.preferences.target || 'en';
    ensureLanguagePairValidity();
    if (ELEMENTS.langBaseSelect) ELEMENTS.langBaseSelect.value = STATE.languages.base;
    if (ELEMENTS.langTargetSelect) ELEMENTS.langTargetSelect.value = STATE.languages.target;
    renderLanguagesSection();
  }

  function ensureLanguagePairValidity() {
    if (STATE.languages.base === STATE.languages.target) {
      const fallback = ['es', 'en', 'fr'].find(lang => lang !== STATE.languages.base) || 'en';
      STATE.languages.target = fallback;
      if (ELEMENTS.langTargetSelect) ELEMENTS.langTargetSelect.value = fallback;
    }
    STATE.languages.profile.preferences = { base: STATE.languages.base, target: STATE.languages.target };
  }

  function persistLanguagesState() {
    localStorage.setItem(getLanguageStorageKey(), JSON.stringify(STATE.languages.profile));
  }

  function getLanguagePairKey() {
    return STATE.languages.base + '-' + STATE.languages.target;
  }

  function getLessonsForCurrentPair() {
    return LANGUAGE_LESSON_SETS[getLanguagePairKey()] || [];
  }

  // Lógica de desbloqueo del mapa: primera lección abierta, resto por cadena de completado.
  function getLessonState(lesson, index, lessons) {
    const pairKey = getLanguagePairKey();
    const completedMap = STATE.languages.profile.completedLessons[pairKey] || {};
    const completed = !!completedMap[lesson.id] && completedMap[lesson.id].completed;
    if (completed) return 'completed';
    if (index === 0) return 'unlocked';
    const prevLesson = lessons[index - 1];
    const prevCompleted = !!completedMap[prevLesson.id] && completedMap[prevLesson.id].completed;
    return prevCompleted ? 'unlocked' : 'locked';
  }

  function renderLanguagesSection() {
    const baseLabel = LANGUAGE_LABELS[STATE.languages.base] || STATE.languages.base;
    const targetLabel = LANGUAGE_LABELS[STATE.languages.target] || STATE.languages.target;
    if (ELEMENTS.languagesActivePath) {
      ELEMENTS.languagesActivePath.textContent = 'Estás aprendiendo ' + targetLabel + ' desde ' + baseLabel + '.';
    }

    const xp = Number(STATE.languages.profile.xpByTarget[STATE.languages.target] || 0);
    const hearts = STATE.languages.session.hearts || STATE.languages.session.maxHearts;
    if (ELEMENTS.langProfileTarget) ELEMENTS.langProfileTarget.textContent = targetLabel;
    if (ELEMENTS.langProfileXp) ELEMENTS.langProfileXp.textContent = xp + ' XP';
    if (ELEMENTS.langProfileHearts) ELEMENTS.langProfileHearts.textContent = hearts + '/' + STATE.languages.session.maxHearts;
    if (ELEMENTS.langProfileGems) ELEMENTS.langProfileGems.textContent = String(STATE.languages.profile.gems || 0);
    if (ELEMENTS.langProfileXpProgress) {
      const pct = Math.max(0, Math.min(100, (xp % 400) / 4));
      ELEMENTS.langProfileXpProgress.style.width = pct + '%';
    }

    const motivationPool = ['Buen trabajo, mantén el ritmo.', 'Hoy has hecho progreso real.', 'Vuelve mañana y sigue mejorando.', 'Cada frase te acerca a tu objetivo.'];
    if (ELEMENTS.languagesMotivation) {
      ELEMENTS.languagesMotivation.textContent = motivationPool[Math.floor(Math.random() * motivationPool.length)];
    }

    renderLanguagesPath();
    renderLanguagesLessonPanel();
    updateLanguageProfileStatsOnProfile();
  }

  function renderLanguagesPath() {
    if (!ELEMENTS.languagesPath) return;
    const lessons = getLessonsForCurrentPair();
    if (!lessons.length) {
      ELEMENTS.languagesPath.innerHTML = '<p class="languages-feedback">Por ahora esta combinación no tiene lecciones demo. Prueba Español → Inglés o Español → Francés.</p>';
      return;
    }

    ELEMENTS.languagesPath.innerHTML = lessons.map((lesson, idx) => {
      const status = getLessonState(lesson, idx, lessons);
      const cat = CATEGORY_META[lesson.category] || CATEGORY_META.vocabulary;
      const pairKey = getLanguagePairKey();
      const completedInfo = (STATE.languages.profile.completedLessons[pairKey] || {})[lesson.id] || {};
      const lessonXp = completedInfo.xp || 0;
      const actionText = status === 'locked' ? 'Bloqueada' : (status === 'completed' ? 'Repetir' : 'Empezar');
      const dotText = status === 'completed' ? '✓' : String(idx + 1);
      return '<div class="language-node ' + status + '">' +
        '<div class="language-node-dot">' + dotText + '</div>' +
        '<div class="language-node-info">' +
        '<span class="language-node-title">' + cat.icon + ' ' + lesson.title + '</span>' +
        '<span class="language-node-sub">' + cat.label + '</span>' +
        '<span class="language-node-xp">⭐ ' + lessonXp + ' XP</span>' +
        '</div>' +
        '<button class="language-node-action" data-lang-lesson="' + lesson.id + '" ' + (status === 'locked' ? 'disabled' : '') + '>' + actionText + '</button>' +
        '</div>';
    }).join('');

    ELEMENTS.languagesPath.querySelectorAll('[data-lang-lesson]').forEach(btn => {
      btn.addEventListener('click', () => {
        const lessonId = btn.getAttribute('data-lang-lesson');
        startLanguageLesson(lessonId);
      });
    });
  }

  function startLanguageLesson(lessonId) {
    const lessons = getLessonsForCurrentPair();
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;

    STATE.languages.activeLesson = lesson;
    STATE.languages.session.hearts = STATE.languages.session.maxHearts;
    STATE.languages.session.phraseIndex = 0;
    STATE.languages.session.phraseStats = [];
    STATE.languages.session.phraseStartAt = Date.now();
    STATE.languages.session.totalErrors = 0;
    STATE.languages.session.finished = false;
    renderLanguagesLessonPanel();
  }

  function normalizePhrase(value) {
    return String(value || '').trim().replace(/\s+/g, ' ').toLowerCase();
  }

  function calcLevenshtein(a, b) {
    const s = normalizePhrase(a);
    const t = normalizePhrase(b);
    const m = s.length;
    const n = t.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = s[i - 1] === t[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost
        );
      }
    }
    return dp[m][n];
  }

  // Lógica de XP/corazones/gemas para el modo Aprender Idiomas.
  function submitLanguagePhrase() {
    const lesson = STATE.languages.activeLesson;
    if (!lesson || !ELEMENTS.languageTypingInput) return;
    const phrase = lesson.phrases[STATE.languages.session.phraseIndex];
    if (!phrase) return;

    const typed = ELEMENTS.languageTypingInput.value;
    const expected = phrase.target;
    const errors = calcLevenshtein(typed, expected);
    const acc = Math.max(0, ((Math.max(1, normalizePhrase(expected).length) - errors) / Math.max(1, normalizePhrase(expected).length)) * 100);
    const elapsedMin = Math.max(0.01, (Date.now() - STATE.languages.session.phraseStartAt) / 60000);
    const wpm = Math.max(0, Math.round((normalizePhrase(typed).length / 5) / elapsedMin));
    const badPhrase = acc < 80 || errors > 2;

    if (badPhrase) {
      STATE.languages.session.hearts = Math.max(0, STATE.languages.session.hearts - 1);
      if (ELEMENTS.languageLessonFeedback) {
        ELEMENTS.languageLessonFeedback.textContent = 'Te has acercado, pero se perdió un corazón ❤️. Ajusta precisión y vuelve a intentarlo.';
      }
    } else {
      const gain = 10 + (acc >= 95 ? 4 : 0);
      STATE.languages.profile.xpByTarget[STATE.languages.target] = Number(STATE.languages.profile.xpByTarget[STATE.languages.target] || 0) + gain;
      if (ELEMENTS.languageLessonFeedback) {
        ELEMENTS.languageLessonFeedback.textContent = 'Buen trabajo. +' + gain + ' XP ⭐';
      }
    }

    STATE.languages.session.phraseStats.push({ acc: acc, wpm: wpm, errors: errors, ok: !badPhrase });
    STATE.languages.session.totalErrors += errors;

    if (STATE.languages.session.hearts <= 0) {
      if (ELEMENTS.languageLessonFeedback) {
        ELEMENTS.languageLessonFeedback.textContent = 'Has perdido todos los corazones. Inténtalo de nuevo mañana o repite una lección más fácil.';
      }
      renderLanguagesSection();
      persistLanguagesState();
      return;
    }

    STATE.languages.session.phraseIndex += 1;
    if (STATE.languages.session.phraseIndex >= lesson.phrases.length) {
      finishLanguageLesson();
      return;
    }

    STATE.languages.session.phraseStartAt = Date.now();
    renderLanguagesLessonPanel();
    persistLanguagesState();
  }

  function finishLanguageLesson() {
    const lesson = STATE.languages.activeLesson;
    if (!lesson) return;
    const stats = STATE.languages.session.phraseStats;
    const avgAcc = stats.length ? stats.reduce((s, p) => s + p.acc, 0) / stats.length : 0;
    const avgWpm = stats.length ? stats.reduce((s, p) => s + p.wpm, 0) / stats.length : 0;
    const success = avgAcc >= 85 && STATE.languages.session.hearts > 0;

    if (success) {
      const bonusXp = 30;
      STATE.languages.profile.xpByTarget[STATE.languages.target] = Number(STATE.languages.profile.xpByTarget[STATE.languages.target] || 0) + bonusXp;
      const pairKey = getLanguagePairKey();
      if (!STATE.languages.profile.completedLessons[pairKey]) STATE.languages.profile.completedLessons[pairKey] = {};
      STATE.languages.profile.completedLessons[pairKey][lesson.id] = {
        completed: true,
        xp: Math.round((STATE.languages.profile.completedLessons[pairKey][lesson.id] || {}).xp || 0) + bonusXp,
        bestAcc: Math.max(avgAcc, Number((STATE.languages.profile.completedLessons[pairKey][lesson.id] || {}).bestAcc || 0))
      };
      checkCategoryReward(pairKey, lesson.category);
      if (ELEMENTS.languageLessonFeedback) {
        ELEMENTS.languageLessonFeedback.textContent = 'Lección superada. +' + bonusXp + ' XP de bonus ⭐';
      }
    } else if (ELEMENTS.languageLessonFeedback) {
      ELEMENTS.languageLessonFeedback.textContent = 'Lección completada, pero no alcanzaste 85% global. Repite para desbloquear la siguiente.';
    }

    STATE.languages.session.finished = true;
    persistLanguagesState();
    renderLanguagesSection();
    if (ELEMENTS.languageLessonWpm) ELEMENTS.languageLessonWpm.textContent = String(Math.round(avgWpm));
    if (ELEMENTS.languageLessonAcc) ELEMENTS.languageLessonAcc.textContent = Math.round(avgAcc) + '%';
  }

  function checkCategoryReward(pairKey, category) {
    const lessons = getLessonsForCurrentPair().filter(l => l.category === category);
    const completedMap = STATE.languages.profile.completedLessons[pairKey] || {};
    const allDone = lessons.every(lesson => completedMap[lesson.id] && completedMap[lesson.id].completed);
    const rewardKey = pairKey + ':' + category;
    if (allDone && !STATE.languages.profile.categoryRewards[rewardKey]) {
      STATE.languages.profile.gems += 20;
      STATE.languages.profile.categoryRewards[rewardKey] = true;
      if (ELEMENTS.languageLessonFeedback) {
        ELEMENTS.languageLessonFeedback.textContent = 'Categoría completada. +20 gemas 💎';
      }
    }
  }

  function renderLanguagesLessonPanel() {
    const lesson = STATE.languages.activeLesson;
    if (!lesson || !ELEMENTS.languageLessonPanel) {
      if (ELEMENTS.languageLessonPanel) ELEMENTS.languageLessonPanel.style.display = 'none';
      return;
    }

    const phrase = lesson.phrases[Math.min(lesson.phrases.length - 1, STATE.languages.session.phraseIndex)] || lesson.phrases[0];
    const completedCount = STATE.languages.session.phraseStats.length;
    const avgAcc = completedCount ? Math.round(STATE.languages.session.phraseStats.reduce((s, p) => s + p.acc, 0) / completedCount) : 100;
    const avgWpm = completedCount ? Math.round(STATE.languages.session.phraseStats.reduce((s, p) => s + p.wpm, 0) / completedCount) : 0;
    const progressPct = Math.round((completedCount / lesson.phrases.length) * 100);

    ELEMENTS.languageLessonPanel.style.display = 'block';
    if (ELEMENTS.languageLessonTitle) ELEMENTS.languageLessonTitle.textContent = lesson.title;
    if (ELEMENTS.languageLessonDescription) ELEMENTS.languageLessonDescription.textContent = lesson.explanation;
    if (ELEMENTS.languageLessonProgressLabel) {
      ELEMENTS.languageLessonProgressLabel.textContent = Math.min(lesson.phrases.length, completedCount + 1) + '/' + lesson.phrases.length;
    }
    if (ELEMENTS.languageLessonAcc) ELEMENTS.languageLessonAcc.textContent = avgAcc + '%';
    if (ELEMENTS.languageLessonWpm) ELEMENTS.languageLessonWpm.textContent = String(avgWpm);
    if (ELEMENTS.languageLessonProgressBar) ELEMENTS.languageLessonProgressBar.style.width = progressPct + '%';
    if (ELEMENTS.languagePromptBase) ELEMENTS.languagePromptBase.textContent = phrase.base;
    if (ELEMENTS.languagePromptHint) {
      ELEMENTS.languagePromptHint.textContent = 'Escribe la traducción en ' + (LANGUAGE_LABELS[STATE.languages.target] || STATE.languages.target) + '.';
    }
    if (ELEMENTS.languageTargetDisplay) {
      const words = normalizePhrase(phrase.target).split(' ').filter(Boolean).length;
      ELEMENTS.languageTargetDisplay.textContent = 'Objetivo: escribe la traducción (' + words + ' palabras aprox.)';
    }
    if (ELEMENTS.languageTypingInput) {
      ELEMENTS.languageTypingInput.value = '';
      ELEMENTS.languageTypingInput.focus();
    }

    if (ELEMENTS.langProfileHearts) {
      ELEMENTS.langProfileHearts.textContent = STATE.languages.session.hearts + '/' + STATE.languages.session.maxHearts;
    }
  }

  function updateLanguageProfileStatsOnProfile() {
    const xpByTarget = STATE.languages.profile.xpByTarget || { es: 0, en: 0, fr: 0 };
    const totalXp = Number(xpByTarget.es || 0) + Number(xpByTarget.en || 0) + Number(xpByTarget.fr || 0);
    const completed = Object.values(STATE.languages.profile.completedLessons || {}).reduce((sum, byPair) => {
      return sum + Object.values(byPair || {}).filter(v => v && v.completed).length;
    }, 0);
    if (ELEMENTS.langTotalXpProfile) ELEMENTS.langTotalXpProfile.textContent = totalXp + ' XP';
    if (ELEMENTS.langLessonsDoneProfile) ELEMENTS.langLessonsDoneProfile.textContent = String(completed);
    if (ELEMENTS.langGemsProfile) ELEMENTS.langGemsProfile.textContent = String(STATE.languages.profile.gems || 0);
  }

  function rewardLanguageSupportClick() {
    STATE.languages.profile.gems += 5;
    persistLanguagesState();
    if (ELEMENTS.languageLessonFeedback) {
      ELEMENTS.languageLessonFeedback.textContent = 'Gracias por apoyar el proyecto. +5 gemas 💎';
    }
    renderLanguagesSection();
  }

  function getArenaFromTrophies(trophies) {
    return ARENAS.find(a => trophies >= a.min && trophies <= a.max) || ARENAS[0];
  }

  function getCurrentStreakReward(streakDays) {
    return STREAK_REWARDS.find(s => streakDays >= s.min && streakDays <= s.max) || STREAK_REWARDS[0];
  }

  function getLeagueDivisionFromPoints(points) {
    const safe = Math.max(0, Math.floor(points));
    const divisionsPerLeague = 10;
    const pointsPerDivision = 80;
    const totalDivisionIndex = Math.floor(safe / pointsPerDivision);
    const leagueIndex = Math.min(LEAGUE_NAMES.length - 1, Math.floor(totalDivisionIndex / divisionsPerLeague));
    const divisionIndex = (totalDivisionIndex % divisionsPerLeague) + 1;
    const divisionRoman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][divisionIndex - 1];
    const currentDivisionBase = totalDivisionIndex * pointsPerDivision;
    const progressPct = ((safe - currentDivisionBase) / pointsPerDivision) * 100;
    return {
      label: LEAGUE_NAMES[leagueIndex] + ' ' + divisionRoman,
      progressPct: Math.max(0, Math.min(100, progressPct))
    };
  }

  function buildCompetitiveSnapshot() {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const userData = STATE.currentUser ? users[STATE.currentUser.email] : null;
    const tests = userData && userData.tests ? userData.tests : [];
    const versus = tests.filter(t => String(t.mode || '').startsWith('versus-'));
    const wins = versus.filter(t => t.versusOutcome === 'win').length;
    const draws = versus.filter(t => t.versusOutcome === 'draw').length;

    const daysWithActivity = new Set(
      tests.map(t => new Date(t.date).toISOString().slice(0, 10))
    );
    const streakDays = Math.max(1, Math.min(30, daysWithActivity.size));
    const streakReward = getCurrentStreakReward(streakDays);

    const trophyBase = (wins * 45) + (draws * 18) + (tests.length * 4) + (streakDays * 5);
    const trophies = Math.max(0, trophyBase);
    const arena = getArenaFromTrophies(trophies);
    const nextThreshold = arena.max === Infinity ? trophies : arena.max;
    const progressPct = arena.max === Infinity
      ? 100
      : ((trophies - arena.min) / Math.max(1, arena.max - arena.min)) * 100;

    const weeklyPoints = (wins * 3) + (draws * 1) + Math.floor(streakDays * 2.2) + Math.floor((getUserAverageWpm() - 40) / 6);
    const league = getLeagueDivisionFromPoints(weeklyPoints);

    const isTop100 = arena.name === 'Maestro' && weeklyPoints >= 380;
    return {
      trophies,
      arena,
      nextThreshold,
      progressPct: Math.max(0, Math.min(100, progressPct)),
      weeklyPoints,
      league,
      streakDays,
      streakReward,
      isTop100
    };
  }

  function initCompetitiveUI() {
    const snapshot = buildCompetitiveSnapshot();
    renderArenaSidebar(snapshot);
    renderLeagueTables(snapshot);
    renderCompetitiveDashboard(snapshot);
    renderProfileCompetitive(snapshot);
    renderTop100Overlay(snapshot);
    maybeShowCompetitiveResetToast(snapshot);
    updateVersusEliteBadge(snapshot.isTop100);
  }

  async function syncCompetitiveLeaderboard({ limit = 50 } = {}) {
    const urls = [LEADERBOARD_COMP_ENDPOINTS.test, LEADERBOARD_COMP_ENDPOINTS.prod];

    let rows = null;

    try {
      const results = await Promise.allSettled(
        urls.map(async baseUrl => {
          const url = baseUrl + '?limit=' + encodeURIComponent(String(limit));
          const response = await fetch(url, { method: 'GET' });
          const data = await parseWebhookResponse(response);
          return { ok: response.ok, status: response.status, data, url };
        })
      );

      // Tomar la primera respuesta exitosa
      for (const result of results) {
        if (result.status !== 'fulfilled' || !result.value || !result.value.ok) continue;
        const payload = result.value.data;
        const candidates = payload && (payload.competitive || payload.leaderboard || payload.entries || payload);
        if (Array.isArray(candidates) && candidates.length > 0) {
          rows = candidates;
          console.log('[CompetitiveLeaderboard] cargado desde', result.value.url, '— entradas:', rows.length);
          break;
        }
      }
    } catch (err) {
      console.warn('[CompetitiveLeaderboard] error:', err.message);
      return;
    }

    if (!Array.isArray(rows) || rows.length === 0) {
      console.warn('[CompetitiveLeaderboard] sin datos o sin respuesta OK');
      return;
    }

    // ── Renderizar tabla en sección "ligas" ──
    if (ELEMENTS.leaguesTableBody) {
      ELEMENTS.leaguesTableBody.innerHTML = rows.map((row, i) => {
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1);
        return '<tr>' +
          '<td>' + medal + '</td>' +
          '<td>@' + (row.username || '—') + '</td>' +
          '<td>' + (row.leagueLabel || row.league_label || row.arena_name || '—') + '</td>' +
          '<td>' + (row.trophies ?? '—') + '</td>' +
          '<td>' + (row.bestWpm ?? row.best_wpm ?? '—') + ' wpm</td>' +
          '</tr>';
      }).join('');
    }

    // ── Renderizar mini-lista en sección "competitivo" ──
    if (ELEMENTS.competitiveLeagueMini) {
      ELEMENTS.competitiveLeagueMini.innerHTML = rows.slice(0, 8).map((row, i) => {
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1) + '.';
        return '<div class="competitive-mini-row">' +
          '<span>' + medal + ' @' + (row.username || '—') + '</span>' +
          '<strong>' + (row.trophies ?? '—') + ' 🏆</strong>' +
          '<em>' + (row.leagueLabel || row.league_label || row.arena_name || '—') + '</em>' +
          '</div>';
      }).join('');
    }
  }

  function renderArenaSidebar(snapshot) {
    if (ELEMENTS.arenaCurrentName) ELEMENTS.arenaCurrentName.textContent = snapshot.arena.name;
    if (ELEMENTS.arenaCurrentTrophies) ELEMENTS.arenaCurrentTrophies.textContent = String(snapshot.trophies);
    if (ELEMENTS.arenaNextThreshold) ELEMENTS.arenaNextThreshold.textContent = String(snapshot.nextThreshold);
    if (ELEMENTS.arenaSidebarProgress) ELEMENTS.arenaSidebarProgress.style.width = snapshot.progressPct + '%';

    if (ELEMENTS.arenaBenefitsList) {
      ELEMENTS.arenaBenefitsList.innerHTML = snapshot.arena.benefits
        .map(benefit => '<li>' + benefit + '</li>')
        .join('');
    }
  }

  function renderLeagueTables(snapshot) {
    const basePlayers = [
      { name: '@proplayer', league: 'Maestro II', points: 981, delta: '+12' },
      { name: '@neonkeys', league: 'Maestro III', points: 955, delta: '+8' },
      { name: '@typedemon', league: 'Diamante I', points: 932, delta: '-3' },
      { name: '@keystorm', league: 'Diamante II', points: 901, delta: '+4' }
    ];
    const me = {
      name: STATE.currentUser ? '@' + STATE.currentUser.username : '@invitado',
      league: snapshot.league.label,
      points: snapshot.weeklyPoints,
      delta: '+3'
    };
    const rows = [...basePlayers, me].sort((a, b) => b.points - a.points);

    if (ELEMENTS.leaguesTableBody) {
      ELEMENTS.leaguesTableBody.innerHTML = rows.map((row, i) => {
        const cls = String(row.delta).startsWith('-') ? 'trend-down' : 'trend-up';
        const icon = String(row.delta).startsWith('-') ? '▼' : '▲';
        return '<tr>' +
          '<td>' + (i + 1) + '</td>' +
          '<td>' + row.name + '</td>' +
          '<td>' + row.league + '</td>' +
          '<td>' + row.points + '</td>' +
          '<td class="' + cls + '">' + icon + ' ' + row.delta + '</td>' +
          '</tr>';
      }).join('');
    }

    if (ELEMENTS.competitiveLeagueMini) {
      ELEMENTS.competitiveLeagueMini.innerHTML = rows.slice(0, 6).map((row, i) => {
        const cls = String(row.delta).startsWith('-') ? 'trend-down' : 'trend-up';
        return '<div class="competitive-mini-row">' +
          '<span>' + (i + 1) + '. ' + row.name + '</span>' +
          '<strong>' + row.points + ' pts</strong>' +
          '<em class="' + cls + '">' + row.delta + '</em>' +
          '</div>';
      }).join('');
    }
  }

  function renderCompetitiveDashboard(snapshot) {
    if (ELEMENTS.competitiveArenaLabel) ELEMENTS.competitiveArenaLabel.textContent = snapshot.arena.name;
    if (ELEMENTS.competitiveTrophiesLabel) ELEMENTS.competitiveTrophiesLabel.textContent = snapshot.trophies + ' / ' + snapshot.nextThreshold;
    if (ELEMENTS.competitiveLeagueLabel) ELEMENTS.competitiveLeagueLabel.textContent = snapshot.league.label;
    if (ELEMENTS.competitivePointsLabel) ELEMENTS.competitivePointsLabel.textContent = snapshot.weeklyPoints + ' pts';
    if (ELEMENTS.competitiveDivisionProgress) ELEMENTS.competitiveDivisionProgress.style.width = snapshot.league.progressPct + '%';
    if (ELEMENTS.streakRingCenter) ELEMENTS.streakRingCenter.textContent = 'Streak: ' + snapshot.streakDays + 'd';
    if (ELEMENTS.streakRewardLabel) {
      ELEMENTS.streakRewardLabel.textContent = 'Bono activo: ' + snapshot.streakReward.label + ' · ' + snapshot.streakReward.visual;
    }
    drawRingChart(ELEMENTS.streakRingChart, snapshot.streakDays, 21);
    drawCompetitiveWeeklyChart(snapshot.weeklyPoints);
  }

  function drawRingChart(canvas, value, max) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const radius = Math.min(W, H) * 0.38;
    const start = -Math.PI / 2;
    const pct = Math.max(0, Math.min(1, value / Math.max(1, max)));
    const style = getComputedStyle(document.body);
    const accent = style.getPropertyValue('--accent-primary').trim() || '#e2b714';
    const bg = style.getPropertyValue('--bg-secondary').trim() || '#2c2e31';

    ctx.clearRect(0, 0, W, H);
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = bg;
    ctx.lineWidth = 13;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, radius, start, start + (Math.PI * 2 * pct));
    ctx.strokeStyle = accent;
    ctx.lineWidth = 13;
    ctx.lineCap = 'round';
    ctx.stroke();
  }

  function drawCompetitiveWeeklyChart(points) {
    const canvas = ELEMENTS.competitiveWeeklyChart;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth || 520;
    canvas.height = 240;
    const data = [Math.max(10, points - 26), Math.max(10, points - 19), Math.max(10, points - 12), Math.max(10, points - 7), Math.max(10, points - 3), Math.max(10, points - 1), points];
    const W = canvas.width;
    const H = canvas.height;
    const pad = { top: 14, right: 14, bottom: 26, left: 34 };
    const chartW = W - pad.left - pad.right;
    const chartH = H - pad.top - pad.bottom;
    const max = Math.max(...data);
    const style = getComputedStyle(document.body);
    const accent = style.getPropertyValue('--accent-primary').trim() || '#e2b714';
    const textLight = style.getPropertyValue('--text-light').trim() || '#a8aab5';

    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    for (let i = 0; i < 4; i++) {
      const y = pad.top + (chartH / 3) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + chartW, y);
      ctx.stroke();
    }

    ctx.beginPath();
    data.forEach((v, i) => {
      const x = pad.left + (i / (data.length - 1)) * chartW;
      const y = pad.top + chartH - (v / max) * chartH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2.4;
    ctx.stroke();

    ctx.fillStyle = textLight;
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ['L', 'M', 'X', 'J', 'V', 'S', 'D'].forEach((d, i) => {
      const x = pad.left + (i / (data.length - 1)) * chartW;
      ctx.fillText(d, x, H - 6);
    });
  }

  function renderProfileCompetitive(snapshot) {
    if (ELEMENTS.profileLeagueBadge) ELEMENTS.profileLeagueBadge.textContent = snapshot.league.label;
    if (ELEMENTS.profileLeaguePoints) ELEMENTS.profileLeaguePoints.textContent = snapshot.weeklyPoints + ' pts';
    if (ELEMENTS.profileLeagueProgress) ELEMENTS.profileLeagueProgress.style.width = snapshot.league.progressPct + '%';
    if (ELEMENTS.profileArenaBadge) ELEMENTS.profileArenaBadge.textContent = snapshot.arena.name;
    if (ELEMENTS.profileArenaTrophies) ELEMENTS.profileArenaTrophies.textContent = snapshot.trophies + ' / ' + snapshot.nextThreshold;
    drawRingChart(ELEMENTS.profileArenaChart, snapshot.progressPct, 100);
  }

  function renderTop100Overlay(snapshot) {
    if (ELEMENTS.top100Fab) {
      ELEMENTS.top100Fab.style.display = snapshot.isTop100 ? 'inline-flex' : 'none';
    }
    if (ELEMENTS.top100MiniBoard) {
      const rows = [
        '@proplayer · 2460',
        '@neonkeys · 2430',
        '@typedemon · 2394',
        (STATE.currentUser ? '@' + STATE.currentUser.username : '@invitado') + ' · ' + (2300 + snapshot.weeklyPoints)
      ];
      ELEMENTS.top100MiniBoard.innerHTML = rows.map((r, i) => '<div>' + (i + 1) + '. ' + r + '</div>').join('');
    }
  }

  function maybeShowCompetitiveResetToast(snapshot) {
    if (!ELEMENTS.competitiveToast) return;
    const day = new Date().getDay();
    if (day !== 0) return;
    ELEMENTS.competitiveToast.textContent = 'El reset semanal de ligas ocurre hoy. Mantén tu posición en ' + snapshot.league.label + '.';
    ELEMENTS.competitiveToast.style.display = 'block';
    setTimeout(() => {
      if (ELEMENTS.competitiveToast) ELEMENTS.competitiveToast.style.display = 'none';
    }, 5500);
  }

  function updateVersusEliteBadge(isTop100) {
    if (!ELEMENTS.versusEliteBadge) return;
    ELEMENTS.versusEliteBadge.style.display = isTop100 ? 'inline-flex' : 'none';
  }

  function handleNavigation(e) {
    const sectionId = e.target.dataset.section;
    ELEMENTS.navButtons.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    ELEMENTS.sections.forEach(s => s.classList.remove('active'));
    document.getElementById(sectionId)?.classList.add('active');
    if (sectionId !== 'test') pauseTest();
    if (sectionId !== 'versus') {
      stopVersusMatch('idle');
      closeVersusResultsModal();
    }
    if (sectionId === 'versus') {
      syncVersusNamesAndRanks();
      showVersusLoginHintIfNeeded();
      refreshVersusObjectiveUi();
    }
    if (sectionId === 'languages') {
      renderLanguagesSection();
    }
    if (sectionId === 'profile') {
      // Render local stats immediately, then sync remote in background
      if (STATE.currentUser) displayProfile();
      void syncRemoteProfile({ allowNullOriginPing: true });
    }
    if (sectionId === 'leaderboard') {
      void syncRemoteLeaderboard({ allowNullOriginPing: true, limit: 20 });
    }
    if (sectionId === 'leagues' || sectionId === 'competitive') {
      void syncCompetitiveLeaderboard({ limit: 50 });
    }
  }

  function pauseTest() {
    STATE.isTestActive = false;
    clearInterval(STATE.timerInterval);
    clearInterval(STATE.wpmSnapshotInterval);
  }

  function handleThemeChange(e) {
    const theme = e.target.dataset.theme;
    STATE.theme = theme;
    applyTheme(theme);
    localStorage.setItem('theme', theme);
    updateThemeButtons();
  }

  function applyTheme(theme) {
    document.body.className = 'theme-' + theme;
  }

  function updateThemeButtons() {
    ELEMENTS.themeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === STATE.theme);
    });
  }

  function handleGlobalShortcuts(e) {
    if (e.key === 'Tab') {
      STATE.lastTabPressAt = Date.now();
      return;
    }

    const tabEnterCombo = e.key === 'Enter' && (Date.now() - STATE.lastTabPressAt) <= 1500;
    // tabSpaceCombo only when NOT in an active test — avoids restarting when first Space is pressed
    const tabSpaceCombo = e.key === ' ' && !STATE.isTestActive && (Date.now() - STATE.lastTabPressAt) <= 1500;
    if ((e.key === 'Enter' && e.ctrlKey) || tabEnterCombo || tabSpaceCombo) {
      e.preventDefault();
      triggerQuickRestart();
      return;
    }

    if (e.key === 'Escape') {
      const termsModal = $('termsModal');
      const termsModalOverlay = $('termsModalOverlay');
      if (termsModal && termsModal.style.display === 'block') {
        termsModal.style.display = 'none';
        termsModalOverlay.style.display = 'none';
      } else {
        pauseTest();
      }
    }
  }

  function triggerQuickRestart() {
    const termsModal = $('termsModal');
    const termsModalOverlay = $('termsModalOverlay');
    if (termsModal && termsModal.style.display === 'block') {
      termsModal.style.display = 'none';
      if (termsModalOverlay) termsModalOverlay.style.display = 'none';
    }

    const isResultsOpen = ELEMENTS.results && ELEMENTS.results.style.display === 'block';
    if (isResultsOpen) {
      closeResults();
      return;
    }

    const activeSection = document.querySelector('.section.active');
    if (activeSection && activeSection.id === 'versus') {
      stopVersusMatch('idle');
      closeVersusResultsModal();
      startVersusMatch(true);
      return;
    }

    rebuildTest();
  }

  function exportTestsCsv() {
    if (!STATE.currentUser) return;
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const userData = users[STATE.currentUser.email];
    if (!userData || !userData.tests || userData.tests.length === 0) {
      alert('No hay datos para exportar.');
      return;
    }

    const header = ['wpm', 'raw', 'accuracy', 'consistency', 'mode', 'submode', 'language', 'difficulty', 'botDifficulty', 'tags', 'date'];
    const rows = userData.tests.map(t => [
      Number(t.wpm || 0).toFixed(2),
      Number(t.rawWpm || t.wpm || 0).toFixed(2),
      Number(t.acc || 0).toFixed(2),
      Number(t.consistency || 0).toFixed(2),
      t.mode || 'solo',
      t.type || 'words',
      t.language || 'es',
      t.difficulty || '1k',
      t.botDifficulty || '',
      (t.tags || []).join('|'),
      t.date || ''
    ]);

    const csv = [header.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'typehub-tests.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function playSound(type) {
    if (!STATE.soundEnabled) return;
    try {
      const ac = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.frequency.value = type === 'start' ? 800 : 1200;
      gain.gain.setValueAtTime(0.08, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.15);
      osc.start(ac.currentTime);
      osc.stop(ac.currentTime + 0.15);
    } catch (_) { /* sin soporte */ }
  }

  function escapeHtml(text) {
    const d = document.createElement('div');
    d.textContent = text;
    return d.innerHTML;
  }

  document.addEventListener('DOMContentLoaded', init);
})();
