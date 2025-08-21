import React, { createContext, useContext, useState, useEffect } from 'react';

// Tipos para o sistema de tradução
export type Language = 'en' | 'es' | 'pt' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Traduções organizadas por idioma e chave
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.howItWorks': 'How It Works',
    'nav.destinations': 'Destinations',
    'nav.reviews': 'Reviews',
    'nav.planJourney': 'Plan Your Journey',
    
    // Hero Section
    'hero.title': 'Travel Your',
    'hero.titleHighlight': 'Stories',
    'hero.subtitle': 'Transform your favorite books, movies, and TV shows into unforgettable journeys you can live. Step into the worlds you love and turn imagined places into real destinations.',
    'hero.cta': 'Start Your Story Journey',
    
    // How It Works
    'howItWorks.title': 'How It Works',
    'howItWorks.subtitle': 'Three simple steps to transform your favorite stories into real adventures',
    'howItWorks.step1.title': 'Choose Your Story',
    'howItWorks.step1.description': 'Tell us about your favorite book, movie, or TV show. Our Kultrip widget analyzes the story\'s locations and themes.',
    'howItWorks.step2.title': 'Get Your Itinerary',
    'howItWorks.step2.description': 'Receive a personalized travel plan featuring real-world locations from your story, complete with activities and insider tips.',
    'howItWorks.step3.title': 'Live Your Adventure',
    'howItWorks.step3.description': 'Embark on your story-inspired journey with full support, guided tours, and exclusive experiences you won\'t find anywhere else.',
    
    // Widget Section
    'widget.title': 'Experience Your Favorite Stories Like Never Before',
    'widget.subtitle': 'Our revolutionary travel planning widget analyzes your favorite stories and creates personalized itineraries that bring fiction to life.',
    'widget.feature1.title': 'Literary Adventures',
    'widget.feature1.description': 'Walk in the footsteps of your favorite book characters',
    'widget.feature2.title': 'Cinematic Journeys',
    'widget.feature2.description': 'Visit iconic movie locations around the world',
    'widget.feature3.title': 'TV Show Tours',
    'widget.feature3.description': 'Explore the real-world settings of hit series',
    'widget.poweredBy': 'Powered by Kultrip and Your Imagination',
    
    // Destinations
    'destinations.title': 'Popular Story Destinations',
    'destinations.subtitle': 'Discover the most requested story-inspired travel experiences',
    'destinations.cta': 'Explore Other Stories',
    
    // Testimonials
    'testimonials.title': 'What Our Travelers Say',
    'testimonials.subtitle': 'Real stories from real adventurers who\'ve lived their favorite tales',
    'testimonials.sarah.text': 'Dreamm Travel made my Harry Potter dreams come true! The Edinburgh and Scotland tour was absolutely magical.',
    'testimonials.marco.text': 'Following the James Bond locations across Europe was an adventure of a lifetime. Every detail was perfect!',
    'testimonials.lisa.text': 'The Studio Ghibli-inspired tour of Japan exceeded all expectations. Pure magic in every location!',
    
    // Stats
    'stats.travelers': 'Happy Travelers',
    'stats.stories': 'Stories Mapped',
    'stats.countries': 'Countries Covered',
    'stats.satisfaction': 'Satisfaction Rate',
    
    // CTA Section
    'cta.title': 'Ready to Live Your Story?',
    'cta.subtitle': 'Join thousands of travelers who\'ve turned their favorite stories into unforgettable adventures. Your next chapter starts here.',
    'cta.planNow': 'Start Planning Now',
    'cta.consultation': 'Schedule Consultation',
    
    // Footer
    'footer.description': 'Transforming favorite stories into real-world adventures. Experience the magic of storytelling through travel with our innovative approach.',
    'footer.quickLinks': 'Quick Links',
    'footer.contactInfo': 'Contact Info',
    'footer.copyright': '© 2025 Dreamm Travel. All rights reserved.',
    
    // Widget Chat
    'widget.chat.greeting': 'Hi there! 👋 I\'m excited to help you create your story-inspired adventure! First, where would you like to travel?',
    'widget.chat.storyType': 'Perfect! Now, what type of story inspires your wanderlust?',
    'widget.chat.storyTitle': 'Wonderful choice! What\'s the name of the book/movie/TV show that\'s calling to you?',
    'widget.chat.preferences': 'Almost there! What experiences make your heart sing? Select all that appeal to you:',
    'widget.chat.email': 'Amazing! Your personalized itinerary is ready. Where should I send it?',
    'widget.chat.completed.title': 'Your Story Adventure Awaits! ✨',
    'widget.chat.completed.subtitle': 'We\'ve crafted a personalized itinerary inspired by your favorite story. Check your email for the complete adventure guide!',
    'widget.chat.summary': 'Your Adventure Summary:',
    'widget.chat.planAnother': 'Plan Another Adventure',
    'widget.chat.contactAgent': 'Contact Agent',
    'widget.preferences.culinary': 'Culinary Adventures',
    'widget.preferences.active': 'Active Experiences',
    'widget.preferences.business': 'Professional Networking',
    'widget.preferences.photography': 'Photography Tours',
    'widget.preferences.music': 'Music & Arts',
    'widget.preferences.romance': 'Romantic Getaways',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.howItWorks': 'Cómo Funciona',
    'nav.destinations': 'Destinos',
    'nav.reviews': 'Reseñas',
    'nav.planJourney': 'Planifica tu Viaje',
    
    // Hero Section
    'hero.title': 'Viaja tus',
    'hero.titleHighlight': 'Historias',
    'hero.subtitle': 'Transforma tus libros, películas y series favoritas en viajes inolvidables que puedes vivir. Adéntrate en los mundos que amas y convierte lugares imaginarios en destinos reales.',
    'hero.cta': 'Comienza tu Viaje de Historia',
    
    // How It Works
    'howItWorks.title': 'Cómo Funciona',
    'howItWorks.subtitle': 'Tres simples pasos para transformar tus historias favoritas en aventuras reales',
    'howItWorks.step1.title': 'Elige tu Historia',
    'howItWorks.step1.description': 'Cuéntanos sobre tu libro, película o serie favorita. Nuestro widget Kultrip analiza las ubicaciones y temas de la historia.',
    'howItWorks.step2.title': 'Obtén tu Itinerario',
    'howItWorks.step2.description': 'Recibe un plan de viaje personalizado con ubicaciones del mundo real de tu historia, completo con actividades y consejos exclusivos.',
    'howItWorks.step3.title': 'Vive tu Aventura',
    'howItWorks.step3.description': 'Embárcate en tu viaje inspirado en historias con apoyo completo, tours guiados y experiencias exclusivas que no encontrarás en ningún otro lugar.',
    
    // Widget Section
    'widget.title': 'Experimenta tus Historias Favoritas como Nunca Antes',
    'widget.subtitle': 'Nuestro revolucionario widget de planificación de viajes analiza tus historias favoritas y crea itinerarios personalizados que dan vida a la ficción.',
    'widget.feature1.title': 'Aventuras Literarias',
    'widget.feature1.description': 'Camina en los pasos de tus personajes favoritos de libros',
    'widget.feature2.title': 'Viajes Cinematográficos',
    'widget.feature2.description': 'Visita ubicaciones icónicas de películas alrededor del mundo',
    'widget.feature3.title': 'Tours de Series de TV',
    'widget.feature3.description': 'Explora los escenarios del mundo real de series exitosas',
    'widget.poweredBy': 'Impulsado por Kultrip y tu Imaginación',
    
    // Destinations
    'destinations.title': 'Destinos de Historias Populares',
    'destinations.subtitle': 'Descubre las experiencias de viaje inspiradas en historias más solicitadas',
    'destinations.cta': 'Explorar Otras Historias',
    
    // Testimonials
    'testimonials.title': 'Lo que Dicen Nuestros Viajeros',
    'testimonials.subtitle': 'Historias reales de aventureros reales que han vivido sus cuentos favoritos',
    'testimonials.sarah.text': '¡Dreamm Travel hizo realidad mis sueños de Harry Potter! El tour por Edimburgo y Escocia fue absolutamente mágico.',
    'testimonials.marco.text': 'Seguir las ubicaciones de James Bond por Europa fue la aventura de mi vida. ¡Cada detalle fue perfecto!',
    'testimonials.lisa.text': 'El tour inspirado en Studio Ghibli por Japón superó todas las expectativas. ¡Pura magia en cada ubicación!',
    
    // Stats
    'stats.travelers': 'Viajeros Felices',
    'stats.stories': 'Historias Mapeadas',
    'stats.countries': 'Países Cubiertos',
    'stats.satisfaction': 'Tasa de Satisfacción',
    
    // CTA Section
    'cta.title': '¿Listo para Vivir tu Historia?',
    'cta.subtitle': 'Únete a miles de viajeros que han convertido sus historias favoritas en aventuras inolvidables. Tu próximo capítulo comienza aquí.',
    'cta.planNow': 'Comenzar a Planificar Ahora',
    'cta.consultation': 'Programar Consulta',
    
    // Footer
    'footer.description': 'Transformando historias favoritas en aventuras del mundo real. Experimenta la magia de contar historias a través de viajes con nuestro enfoque innovador.',
    'footer.quickLinks': 'Enlaces Rápidos',
    'footer.contactInfo': 'Información de Contacto',
    'footer.copyright': '© 2025 Dreamm Travel. Todos los derechos reservados.',
    
    // Widget Chat
    'widget.chat.greeting': '¡Hola! 👋 ¡Estoy emocionado de ayudarte a crear tu aventura inspirada en historias! Primero, ¿a dónde te gustaría viajar?',
    'widget.chat.storyType': '¡Perfecto! Ahora, ¿qué tipo de historia inspira tu pasión por viajar?',
    'widget.chat.storyTitle': '¡Excelente elección! ¿Cuál es el nombre del libro/película/serie que te está llamando?',
    'widget.chat.preferences': '¡Casi terminamos! ¿Qué experiencias hacen cantar a tu corazón? Selecciona todas las que te atraigan:',
    'widget.chat.email': '¡Increíble! Tu itinerario personalizado está listo. ¿Dónde debo enviarlo?',
    'widget.chat.completed.title': '¡Tu Aventura de Historia te Espera! ✨',
    'widget.chat.completed.subtitle': 'Hemos creado un itinerario personalizado inspirado en tu historia favorita. ¡Revisa tu email para la guía completa de aventura!',
    'widget.chat.summary': 'Resumen de tu Aventura:',
    'widget.chat.planAnother': 'Planificar Otra Aventura',
    'widget.chat.contactAgent': 'Contactar Agente',
    'widget.preferences.culinary': 'Aventuras Culinarias',
    'widget.preferences.active': 'Experiencias Activas',
    'widget.preferences.business': 'Networking Profesional',
    'widget.preferences.photography': 'Tours de Fotografía',
    'widget.preferences.music': 'Música y Artes',
    'widget.preferences.romance': 'Escapadas Románticas',
  },
  pt: {
    // Navigation
    'nav.home': 'Início',
    'nav.howItWorks': 'Como Funciona',
    'nav.destinations': 'Destinos',
    'nav.reviews': 'Avaliações',
    'nav.planJourney': 'Planeje sua Jornada',
    
    // Hero Section
    'hero.title': 'Viaje suas',
    'hero.titleHighlight': 'Histórias',
    'hero.subtitle': 'Transforme seus livros, filmes e séries favoritos em jornadas inesquecíveis que você pode viver. Entre nos mundos que você ama e transforme lugares imaginários em destinos reais.',
    'hero.cta': 'Comece sua Jornada de História',
    
    // How It Works
    'howItWorks.title': 'Como Funciona',
    'howItWorks.subtitle': 'Três passos simples para transformar suas histórias favoritas em aventuras reais',
    'howItWorks.step1.title': 'Escolha sua História',
    'howItWorks.step1.description': 'Conte-nos sobre seu livro, filme ou série favorita. Nosso widget Kultrip analisa as localizações e temas da história.',
    'howItWorks.step2.title': 'Receba seu Roteiro',
    'howItWorks.step2.description': 'Receba um plano de viagem personalizado com localizações do mundo real da sua história, completo com atividades e dicas exclusivas.',
    'howItWorks.step3.title': 'Viva sua Aventura',
    'howItWorks.step3.description': 'Embarque em sua jornada inspirada em histórias com suporte completo, tours guiados e experiências exclusivas que você não encontrará em nenhum outro lugar.',
    
    // Widget Section
    'widget.title': 'Experimente suas Histórias Favoritas como Nunca Antes',
    'widget.subtitle': 'Nosso revolucionário widget de planejamento de viagens analisa suas histórias favoritas e cria roteiros personalizados que dão vida à ficção.',
    'widget.feature1.title': 'Aventuras Literárias',
    'widget.feature1.description': 'Caminhe nos passos dos seus personagens favoritos de livros',
    'widget.feature2.title': 'Jornadas Cinematográficas',
    'widget.feature2.description': 'Visite localizações icônicas de filmes ao redor do mundo',
    'widget.feature3.title': 'Tours de Séries de TV',
    'widget.feature3.description': 'Explore os cenários do mundo real de séries de sucesso',
    'widget.poweredBy': 'Powered by Kultrip e sua Imaginação',
    
    // Destinations
    'destinations.title': 'Destinos de Histórias Populares',
    'destinations.subtitle': 'Descubra as experiências de viagem inspiradas em histórias mais solicitadas',
    'destinations.cta': 'Explorar Outras Histórias',
    
    // Testimonials
    'testimonials.title': 'O que Nossos Viajantes Dizem',
    'testimonials.subtitle': 'Histórias reais de aventureiros reais que viveram seus contos favoritos',
    'testimonials.sarah.text': 'A Dreamm Travel realizou meus sonhos de Harry Potter! O tour por Edimburgo e Escócia foi absolutamente mágico.',
    'testimonials.marco.text': 'Seguir as localizações de James Bond pela Europa foi a aventura da minha vida. Cada detalhe foi perfeito!',
    'testimonials.lisa.text': 'O tour inspirado no Studio Ghibli pelo Japão superou todas as expectativas. Pura magia em cada localização!',
    
    // Stats
    'stats.travelers': 'Viajantes Felizes',
    'stats.stories': 'Histórias Mapeadas',
    'stats.countries': 'Países Cobertos',
    'stats.satisfaction': 'Taxa de Satisfação',
    
    // CTA Section
    'cta.title': 'Pronto para Viver sua História?',
    'cta.subtitle': 'Junte-se a milhares de viajantes que transformaram suas histórias favoritas em aventuras inesquecíveis. Seu próximo capítulo começa aqui.',
    'cta.planNow': 'Começar a Planejar Agora',
    'cta.consultation': 'Agendar Consulta',
    
    // Footer
    'footer.description': 'Transformando histórias favoritas em aventuras do mundo real. Experimente a magia de contar histórias através de viagens com nossa abordagem inovadora.',
    'footer.quickLinks': 'Links Rápidos',
    'footer.contactInfo': 'Informações de Contato',
    'footer.copyright': '© 2025 Dreamm Travel. Todos os direitos reservados.',
    
    // Widget Chat
    'widget.chat.greeting': 'Olá! 👋 Estou animado para ajudá-lo a criar sua aventura inspirada em histórias! Primeiro, para onde você gostaria de viajar?',
    'widget.chat.storyType': 'Perfeito! Agora, que tipo de história inspira sua paixão por viajar?',
    'widget.chat.storyTitle': 'Excelente escolha! Qual é o nome do livro/filme/série que está te chamando?',
    'widget.chat.preferences': 'Quase lá! Que experiências fazem seu coração cantar? Selecione todas que te atraem:',
    'widget.chat.email': 'Incrível! Seu roteiro personalizado está pronto. Onde devo enviá-lo?',
    'widget.chat.completed.title': 'Sua Aventura de História te Espera! ✨',
    'widget.chat.completed.subtitle': 'Criamos um roteiro personalizado inspirado na sua história favorita. Verifique seu email para o guia completo de aventura!',
    'widget.chat.summary': 'Resumo da sua Aventura:',
    'widget.chat.planAnother': 'Planejar Outra Aventura',
    'widget.chat.contactAgent': 'Contatar Agente',
    'widget.preferences.culinary': 'Aventuras Culinárias',
    'widget.preferences.active': 'Experiências Ativas',
    'widget.preferences.business': 'Networking Profissional',
    'widget.preferences.photography': 'Tours de Fotografia',
    'widget.preferences.music': 'Música e Artes',
    'widget.preferences.romance': 'Escapadas Românticas',
  },
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.howItWorks': 'Wie es funktioniert',
    'nav.destinations': 'Reiseziele',
    'nav.reviews': 'Bewertungen',
    'nav.planJourney': 'Reise planen',
    
    // Hero Section
    'hero.title': 'Bereise deine',
    'hero.titleHighlight': 'Geschichten',
    'hero.subtitle': 'Verwandle deine Lieblingsbücher, -filme und -serien in unvergessliche Reisen, die du erleben kannst. Tauche ein in die Welten, die du liebst, und verwandle imaginäre Orte in echte Reiseziele.',
    'hero.cta': 'Beginne deine Geschichtenreise',
    
    // How It Works
    'howItWorks.title': 'Wie es funktioniert',
    'howItWorks.subtitle': 'Drei einfache Schritte, um deine Lieblingsgeschichten in echte Abenteuer zu verwandeln',
    'howItWorks.step1.title': 'Wähle deine Geschichte',
    'howItWorks.step1.description': 'Erzähle uns von deinem Lieblingsbuch, -film oder deiner Lieblingsserie. Unser Kultrip-Widget analysiert die Schauplätze und Themen der Geschichte.',
    'howItWorks.step2.title': 'Erhalte deinen Reiseplan',
    'howItWorks.step2.description': 'Erhalte einen personalisierten Reiseplan mit realen Schauplätzen aus deiner Geschichte, komplett mit Aktivitäten und Insider-Tipps.',
    'howItWorks.step3.title': 'Erlebe dein Abenteuer',
    'howItWorks.step3.description': 'Begib dich auf deine geschichteninspirierte Reise mit vollständiger Unterstützung, geführten Touren und exklusiven Erfahrungen, die du nirgendwo anders findest.',
    
    // Widget Section
    'widget.title': 'Erlebe deine Lieblingsgeschichten wie nie zuvor',
    'widget.subtitle': 'Unser revolutionäres Reiseplanungs-Widget analysiert deine Lieblingsgeschichten und erstellt personalisierte Reisepläne, die Fiktion zum Leben erwecken.',
    'widget.feature1.title': 'Literarische Abenteuer',
    'widget.feature1.description': 'Wandle in den Fußstapfen deiner Lieblingsbuchcharaktere',
    'widget.feature2.title': 'Filmische Reisen',
    'widget.feature2.description': 'Besuche ikonische Filmorte auf der ganzen Welt',
    'widget.feature3.title': 'TV-Serien-Touren',
    'widget.feature3.description': 'Erkunde die realen Schauplätze erfolgreicher Serien',
    'widget.poweredBy': 'Angetrieben von Kultrip und deiner Vorstellungskraft',
    
    // Destinations
    'destinations.title': 'Beliebte Geschichten-Reiseziele',
    'destinations.subtitle': 'Entdecke die meistgefragten geschichteninspirierten Reiseerfahrungen',
    'destinations.cta': 'Andere Geschichten erkunden',
    
    // Testimonials
    'testimonials.title': 'Was unsere Reisenden sagen',
    'testimonials.subtitle': 'Echte Geschichten von echten Abenteurern, die ihre Lieblingserzählungen gelebt haben',
    'testimonials.sarah.text': 'Dreamm Travel hat meine Harry Potter-Träume wahr werden lassen! Die Edinburgh- und Schottland-Tour war absolut magisch.',
    'testimonials.marco.text': 'Den James Bond-Schauplätzen durch Europa zu folgen war das Abenteuer meines Lebens. Jedes Detail war perfekt!',
    'testimonials.lisa.text': 'Die Studio Ghibli-inspirierte Japan-Tour übertraf alle Erwartungen. Pure Magie an jedem Ort!',
    
    // Stats
    'stats.travelers': 'Glückliche Reisende',
    'stats.stories': 'Kartierte Geschichten',
    'stats.countries': 'Abgedeckte Länder',
    'stats.satisfaction': 'Zufriedenheitsrate',
    
    // CTA Section
    'cta.title': 'Bereit, deine Geschichte zu leben?',
    'cta.subtitle': 'Schließe dich Tausenden von Reisenden an, die ihre Lieblingsgeschichten in unvergessliche Abenteuer verwandelt haben. Dein nächstes Kapitel beginnt hier.',
    'cta.planNow': 'Jetzt mit der Planung beginnen',
    'cta.consultation': 'Beratung vereinbaren',
    
    // Footer
    'footer.description': 'Verwandlung von Lieblingsgeschichten in reale Abenteuer. Erlebe die Magie des Geschichtenerzählens durch Reisen mit unserem innovativen Ansatz.',
    'footer.quickLinks': 'Schnelle Links',
    'footer.contactInfo': 'Kontaktinformationen',
    'footer.copyright': '© 2025 Dreamm Travel. Alle Rechte vorbehalten.',
    
    // Widget Chat
    'widget.chat.greeting': 'Hallo! 👋 Ich freue mich darauf, dir bei der Erstellung deines geschichteninspirierten Abenteuers zu helfen! Zuerst, wohin möchtest du reisen?',
    'widget.chat.storyType': 'Perfekt! Nun, welche Art von Geschichte inspiriert deine Reiselust?',
    'widget.chat.storyTitle': 'Wunderbare Wahl! Wie heißt das Buch/der Film/die Serie, die dich ruft?',
    'widget.chat.preferences': 'Fast geschafft! Welche Erfahrungen lassen dein Herz singen? Wähle alle aus, die dich ansprechen:',
    'widget.chat.email': 'Fantastisch! Dein personalisierter Reiseplan ist bereit. Wohin soll ich ihn senden?',
    'widget.chat.completed.title': 'Dein Geschichtenabenteuer wartet! ✨',
    'widget.chat.completed.subtitle': 'Wir haben einen personalisierten Reiseplan inspiriert von deiner Lieblingsgeschichte erstellt. Überprüfe deine E-Mail für den vollständigen Abenteuerführer!',
    'widget.chat.summary': 'Zusammenfassung deines Abenteuers:',
    'widget.chat.planAnother': 'Weiteres Abenteuer planen',
    'widget.chat.contactAgent': 'Agent kontaktieren',
    'widget.preferences.culinary': 'Kulinarische Abenteuer',
    'widget.preferences.active': 'Aktive Erfahrungen',
    'widget.preferences.business': 'Professionelles Networking',
    'widget.preferences.photography': 'Fotografie-Touren',
    'widget.preferences.music': 'Musik & Kunst',
    'widget.preferences.romance': 'Romantische Ausflüge',
  }
};

// Contexto de idioma
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider do contexto de idioma
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Carrega o idioma salvo do localStorage na inicialização
  useEffect(() => {
    const savedLanguage = localStorage.getItem('dreamm-language') as Language;
    if (savedLanguage && ['en', 'es', 'pt', 'de'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Salva o idioma no localStorage quando mudado
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('dreamm-language', lang);
  };

  // Função de tradução
  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook para usar o contexto de idioma
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};