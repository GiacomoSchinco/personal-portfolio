import woodencarpet1 from "@/assets/woodencarpet-1.jpg"
import woodencarpet2 from "@/assets/woodencarpet-2.jpg"
import securityDashboard from "@/assets/securityDashboard.gif"
import puntoCyber from "@/assets/puntoCyber.png"
import piattaformaMicroFrontend from "@/assets/piattaforma-micro-frontend.png"

import type { Accent } from "@/lib/accents"

/**
 * Immagine di progetto.
 *
 * Si usa **solo** dentro `cover` e `gallery`: non si scrive mai un percorso a
 * mano. Le immagini stanno in `src/assets/` e vanno importate qui sopra.
 *
 * Perché: importando, Vite mette un hash nel nome (quindi il browser non può
 * servire una versione vecchia dalla cache) e **un nome di file sbagliato
 * diventa un errore di build** invece di un riquadro vuoto. Un percorso scritto
 * a mano come `"/x.png"` funziona solo per i file in `public/` e non ha nessuno
 * dei due vantaggi. È lo stesso motivo per cui `avatarUrl` in `site.ts` è un
 * import.
 */
export type ProjectImage = {
  src: string
  /** Obbligatorio: un'immagine senza `alt` è inaccessibile. */
  alt: string
  /** Didascalia mostrata sotto l'immagine. */
  caption?: string
}

/**
 * Immagini del progetto: due caselle distinte, con due scopi diversi.
 *
 * - `cover`   → **solo** la copertina della card. Una per progetto.
 * - `gallery` → **solo** il modale. Zero, una o più.
 *
 * Sono separate apposta: le due cose non vanno sempre insieme. Un progetto
 * software ha senso mostrarlo in copertina, ma ripetere lo stesso screenshot
 * dentro il modale non aggiunge niente. Un prodotto fisico invece si racconta
 * per immagini, quindi ha una galleria.
 *
 * Conseguenza da tenere a mente: il permesso vale **solo** per le immagini.
 * Il bottone "Dettagli" c'è su ogni card, perché il modale serve comunque a
 * raccontare il progetto (context, contributi, scelte).
 */
export type ProjectMedia = {
  /** Copertina della card. Senza, resta il gradiente brand. */
  cover?: ProjectImage
  /**
   * Immagini da mostrare **dentro il modale**, in fondo, dopo i testi.
   *
   * ⚠️ Questo campo *è* il permesso. Il modale non pesca mai dalla `cover`: se
   * `gallery` non c'è, o è vuota, nel modale non compare nessuna immagine.
   *
   * È voluto: un progetto di app o di sito di solito NON deve avere immagini
   * nel modale — lo screenshot è già la copertina della card, e ripeterlo più
   * grande non aggiunge niente. Un prodotto fisico invece si racconta per
   * immagini, quindi compila `gallery`.
   *
   * Riepilogo: `cover` → card, sempre. `gallery` → modale, solo se lo concedi.
   */
  gallery?: ProjectImage[]
}

/**
 * Coppia etichetta/valore, mostrata come scheda ("In sintesi").
 *
 * ⚠️ Regola: i riquadri sono **2 o 4** — mai uno o tre. La griglia ha due
 * colonne, quindi con 1 o 3 riquadri l'ultima riga resta mezza vuota e il
 * blocco sembra rotto invece che finito.
 *
 * **Nessun riquadro è una risposta valida**: la sezione "In sintesi" sparisce.
 * Meglio una sezione in meno che un numero approssimativo — vedi il commento su
 * `facts` in Puntocyber.
 *
 * E un riquadro = **una informazione che non c'è già altrove**. Se un numero è
 * già in `contributions`, non si ripete qui solo per arrivare a quattro: è così
 * che i riquadri diventano riempitivo.
 */
export type ProjectFact = {
  label: string
  value: string
}

/**
 * Contenuto del modale di dettaglio.
 *
 * ⚠️ Convenzione: un campo vuoto (`""` o `[]`) NON viene renderizzato. Puoi
 * lasciare vuoto quello che non hai ancora scritto: il modale mostra solo le
 * sezioni piene e si completa da solo man mano che compili.
 *
 * Distinzione che conta:
 * - `context`       → perché il progetto esisteva, per chi. Il problema, non la soluzione.
 * - `contributions` → cosa hai fatto TU. Non cosa fa il prodotto.
 * - `decisions`     → perché quella scelta tecnica e non un'altra.
 * - `facts`         → numeri verificabili (durata, team, moduli, utenti).
 */
export type ProjectDetails = {
  context?: string
  contributions?: string[]
  decisions?: string[]
  facts?: ProjectFact[]
  /**
   * Riga finale del modale. Serve a dire cosa NON c'è e perché, invece di
   * lasciare il visitatore a chiedersi dove sia finito il link.
   */
  note?: string
}

export type Project = {
  slug: string
  title: string
  description: string
  /** Periodo in cui è stato realizzato (il CV non indica l'anno del singolo progetto). */
  year: string
  role: string
  /** Azienda o contesto in cui è nato il progetto. */
  company?: string
  tags: string[]
  /** Se presente, la card diventa cliccabile. */
  href?: string
  repo?: string
  /** I progetti in evidenza occupano più spazio nella griglia. */
  featured?: boolean
  accent: Accent
  /**
   * Immagini del progetto. `cover` finisce sulla card, `gallery` nel modale:
   * sono caselle separate perché non vanno sempre insieme — vedi `ProjectMedia`.
   */
  media?: ProjectMedia
  /** Contenuto del modale di dettaglio. */
  details?: ProjectDetails
}

/**
 * Progetti.
 *
 * I primi tre sono progetti software reali ricavati dai punti di Duskrise in
 * `src/data/resume.json`; il quarto è un prodotto fisico brevettato e non ha
 * nulla a che vedere con lo sviluppo — è qui perché racconta comunque come
 * lavoro (design, ingegnerizzazione, business).
 *
 * ⚠️ Nessun progetto ha link pubblici: sono lavori per clienti/azienda.
 * Le card non sono link, ma hanno il bottone "Dettagli" che apre il modale
 * (`details`). Se un giorno arriva un repo o un case study pubblico, basta
 * aggiungere `href` o `repo`: il link compare da solo, sia in card sia nel
 * modale, senza toccare i componenti.
 */
export const projects: Project[] = [
  {
    slug: "security-dashboard",
    title: "Security Dashboard",
    description:
      "Piattaforma in tempo reale per il monitoraggio dello stato di sicurezza, degli eventi malevoli e delle vulnerabilità aziendali.",
    year: "2021 — 2024",
    role: "Frontend Developer",
    company: "Duskrise",
    tags: ["React", "TanStack Query", "JavaScript", "Bootstrap", "C#", "Python"],
    featured: true,
    accent: "primary",
    // Solo copertina: nessuna galleria, quindi lo screenshot non si ripete
    // dentro il modale. `securityDashboard` è una GIF da 3 MB / 208 fotogrammi:
    // pesante, ed è un altro motivo per non mostrarla due volte.
    media: {
      cover: {
        src: securityDashboard,
        alt: "La Security Dashboard con i pannelli di monitoraggio degli eventi malevoli",
      },
    },
    details: {
      // Contesto e contributi vengono dalle risposte del committente
      // (2026-09-13): su questo progetto il CV ha una sola frase, quindi non
      // bastava. Non c'è nulla di dedotto.
      context:
        "Sono entrato come manutentore di un sistema già in produzione e ne ho imparato l'architettura a fondo, il che mi rendeva veloce sui bug piccoli — quelli che nessuno vuole aprire.",
      contributions: [
        "Manutenzione del frontend e dell'intero sistema lato frontend",
        // Era "React 19": il committente ha corretto in 17 e ha aggiunto cosa
        // ha comportato. Il "⚠️ Da confermare" che stava qui è risolto — con
        // React 17 la data 2021 — 2024 non è più in contraddizione.
        "Migrazione da React 15 a React 17, con aggiornamento di tutte le dipendenze e risoluzione dei conflitti",
        "Report settimanali su utilizzo e criticità riscontrate",
        "Supporto al team backend: script indipendenti in C# e Python per il collegamento ai servizi",
      ],
      decisions: [],
      facts: [
        { label: "Utenze", value: "1.000 – 3.000" },
        { label: "Team", value: "8 persone (UX/UI, backend, frontend, mobile, QA)" },
      ],
      note: "Lavoro aziendale: codice e repository non sono pubblici.",
    },
  },
  {
    slug: "piattaforma-micro-frontend",
    title: "Piattaforma logistica micro-frontend",
    description:
      "Sviluppata da zero: architettura a micro-frontend per la gestione della logistica e del magazzino dei device aziendali.",
    year: "2021 — 2024",
    role: "Frontend Developer",
    company: "Duskrise",
    tags: ["Single-SPA", "Angular", "Micro-frontend", "Architettura", "PrimeNG"],
    featured: true,
    accent: "tertiary",
    // Solo copertina: nessuna galleria, quindi lo screenshot non si ripete
    // dentro il modale.
    media: {
      cover: {
        src: piattaformaMicroFrontend,
        alt: "Il pannello di stato dei device della piattaforma logistica, con il grafico della flotta negli ultimi 12 mesi",
      },
    },
    details: {
      context:
        "Costruita da zero, per l'esigenza aziendale di gestire in dettaglio spedizione e logistica dei device. Tiene traccia di oltre 30.000 unità — dove si trovano e se il servizio è attivo.",
      contributions: [
        "Sviluppo del frontend della piattaforma, da zero",
        "Realizzazione di 8 micro-frontend, tutti interni al team",
        // Il committente ha tenuto a precisare che l'impianto non è farina del
        // suo sacco. È un dettaglio che fa onore: un portfolio che si prende
        // tutto il merito non è credibile.
        "Messa in opera dell'architettura a micro-frontend: la scelta dell'impianto è stata del capo programmatore, la realizzazione interamente mia",
      ],
      decisions: [],
      facts: [
        { label: "Device gestiti", value: "oltre 30.000" },
        // Il numero degli 8 micro-frontend non sta qui: è già in
        // `contributions`, e ripeterlo servirebbe solo a fare quattro riquadri.
        { label: "Team", value: "5 persone (frontend, backend, sistemista, QA, UX/UI)" },
      ],
      note: "Lavoro aziendale: codice e repository non sono pubblici.",
    },
  },
  {
    slug: "marketplace-puntocyber",
    title: "Marketplace Puntocyber",
    description:
      "Marketplace per l'erogazione di servizi di cybersecurity a protezione di dati e sistemi.",
    year: "2021 — 2024",
    role: "Frontend Developer",
    company: "Duskrise",
    tags: ["React", "Next.js", "TanStack Query", "JavaScript", "Tailwind CSS"],
    accent: "secondary",
    media: {
      cover: {
        src: puntoCyber,
        alt: "La schermata Risk Score del marketplace Puntocyber su un portatile",
      },
    },
    details: {
      // Contesto e contributi dalle risposte del committente (13/09/2026).
      // Sul report di analisi la deduzione è solida e vale la pena scriverla:
      // frontend "da zero" + "ero l'unico sul frontend" significa che ogni
      // schermata frontend è sua. Non è un'assunzione nostra.
      context:
        "Prodotto nuovo, un marketplace pubblico per servizi di cybersecurity e intelligence, scritto da zero.",
      // ⚠️ Qui il committente ha chiesto di "inventare qualcosa di plausibile"
      // sul perché di Next.js. Non si fa: era una scelta dell'architetto e lui
      // stesso non ne è certo ("credo servisse per la SEO"). Una motivazione
      // inventata è esattamente il tipo di frase che crolla in un colloquio,
      // quando ti chiedono di spiegarla. Se un giorno la motivazione vera
      // arriva, si compila: la sezione compare da sola.
      contributions: [
        "Report di analisi su un indirizzo email aziendale: si segnala l'indirizzo e il sistema restituisce il livello di rischio",
        "Monitoraggio delle utenze segnalate, per verificare nel tempo se restano criticità",
      ],
      decisions: [],
      // Niente numeri: gli acquisti erano una stima a memoria e il committente
      // li ha fatti togliere (13/09/2026) per non pubblicare un dato che non
      // può difendere. Al loro posto due informazioni che ha detto lui — ma
      // **spostate qui dal contesto**, non inventate: erano già scritte in prosa
      // e "In sintesi" è il posto giusto per ciò che si legge a colpo d'occhio.
      facts: [
        { label: "Clienti", value: "privati e PMI" },
        { label: "Servizi", value: "proprietari, non di terzi" },
      ],
      note: "Lavoro aziendale: codice e repository non sono pubblici.",
    },
  },
  {
    slug: "woodencarpet",
    title: "Woodencarpet",
    description:
      "Prodotto brevettato che coniuga design, ingegnerizzazione dei materiali e sviluppo commerciale. Presentato a London Design Fair (2016) e MADE Expo Milano (2017).",
    year: "2014 — 2019",
    role: "Ideatore e titolare del brevetto",
    company: "Schinco Parquet S.r.l.",
    tags: [
      "Design di prodotto",
      "Brevetti",
      "Business development",
      "Fiere internazionali",
    ],
    accent: "primary",
    // L'unico progetto con una galleria: è un prodotto fisico, si racconta per
    // immagini. La copertina è la stessa foto dello showroom, poi nel modale
    // arriva anche l'ambiente domestico.
    media: {
      cover: {
        src: woodencarpet1,
        alt: "Campioni di Woodencarpet esposti in showroom",
      },
      gallery: [
        {
          src: woodencarpet1,
          alt: "Campioni di Woodencarpet esposti in showroom",
        },
        {
          src: woodencarpet2,
          alt: "Woodencarpet applicato in un ambiente domestico",
        },
      ],
    },
    // L'unico progetto con contenuto completo: viene dalla voce "projects"
    // di `resume.json`.
    details: {
      context:
        "Un prodotto nuovo, non una commessa: ideazione propria, poi brevetto, produzione e vendita. Ha coniugato design, ingegnerizzazione dei materiali e sviluppo commerciale.",
      contributions: [
        "Progettazione concettuale, prototyping e registrazione del brevetto presso l'UIBM",
        "Sviluppo del modello di business e gestione della catena di fornitura",
        "Presentazione e networking in fiere internazionali di design e architettura",
      ],
      // `decisions` è vuoto di proposito: il CV non dice nulla sulle scelte
      // progettuali, e inventarle sarebbe peggio che non mostrarle.
      decisions: [],
      facts: [
        { label: "Brevetto", value: "IT 102012902068013" },
        // "Depositato presso UIBM" è stato tolto: è nella sigla del brevetto
        // stesso e nei contributi. Era il terzo riquadro che faceva numero.
        {
          label: "Fiere internazionali",
          value: "London Design Fair 2016 · MADE Expo Milano 2017",
        },
      ],
      note: "Prodotto fisico: non esiste codice sorgente né repository.",
    },
  },
]
