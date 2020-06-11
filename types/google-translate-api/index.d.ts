declare module '@vitalets/google-translate-api' {
  export interface IHTTPOptions {
    from?: string
    to?: string
  }

  export interface ITranslateHTTPLanguage {
    didYouMean: boolean
    iso: string
  }

  export interface ITranslateHTTPText {
    autoCorrected: boolean
    value: string
    didYouMean: boolean
  }

  export interface ITranslateHTTPResponse {
    text: string
    pronunciation: string
    from: {
      language: ITranslateHTTPLanguage
      text: ITranslateHTTPText
    }
    raw: string
  }

  export enum language {
    'zh-CN' = 'Chinese (Simplified)',
    'zh-TW' = 'Chinese (Traditional)',
    af = 'Afrikaans',
    am = 'Amharic',
    ar = 'Arabic',
    auto = 'Automatic',
    az = 'Azerbaijani',
    be = 'Belarusian',
    bg = 'Bulgarian',
    bn = 'Bengali',
    bs = 'Bosnian',
    ca = 'Catalan',
    ceb = 'Cebuano',
    co = 'Corsican',
    cs = 'Czech',
    cy = 'Welsh',
    da = 'Danish',
    de = 'German',
    el = 'Greek',
    en = 'English',
    eo = 'Esperanto',
    es = 'Spanish',
    et = 'Estonian',
    eu = 'Basque',
    fa = 'Persian',
    fi = 'Finnish',
    fr = 'French',
    fy = 'Frisian',
    ga = 'Irish',
    gd = 'Scots Gaelic',
    gl = 'Galician',
    gu = 'Gujarati',
    ha = 'Hausa',
    haw = 'Hawaiian',
    he = 'Hebrew',
    hi = 'Hindi',
    hmn = 'Hmong',
    hr = 'Croatian',
    ht = 'Haitian Creole',
    hu = 'Hungarian',
    hy = 'Armenian',
    id = 'Indonesian',
    ig = 'Igbo',
    is = 'Icelandic',
    it = 'Italian',
    iw = 'Hebrew',
    ja = 'Japanese',
    jw = 'Javanese',
    ka = 'Georgian',
    kk = 'Kazakh',
    km = 'Khmer',
    kn = 'Kannada',
    ko = 'Korean',
    ku = 'Kurdish (Kurmanji)',
    ky = 'Kyrgyz',
    la = 'Latin',
    lb = 'Luxembourgish',
    lo = 'Lao',
    lt = 'Lithuanian',
    lv = 'Latvian',
    mg = 'Malagasy',
    mi = 'Maori',
    mk = 'Macedonian',
    ml = 'Malayalam',
    mn = 'Mongolian',
    mr = 'Marathi',
    ms = 'Malay',
    mt = 'Maltese',
    my = 'Myanmar (Burmese)',
    ne = 'Nepali',
    nl = 'Dutch',
    no = 'Norwegian',
    ny = 'Chichewa',
    pa = 'Punjabi',
    pl = 'Polish',
    ps = 'Pashto',
    pt = 'Portuguese',
    ro = 'Romanian',
    ru = 'Russian',
    sd = 'Sindhi',
    si = 'Sinhala',
    sk = 'Slovak',
    sl = 'Slovenian',
    sm = 'Samoan',
    sn = 'Shona',
    so = 'Somali',
    sq = 'Albanian',
    sr = 'Serbian',
    st = 'Sesotho',
    su = 'Sundanese',
    sv = 'Swedish',
    sw = 'Swahili',
    ta = 'Tamil',
    te = 'Telugu',
    tg = 'Tajik',
    th = 'Thai',
    tl = 'Filipino',
    tr = 'Turkish',
    uk = 'Ukrainian',
    ur = 'Urdu',
    uz = 'Uzbek',
    vi = 'Vietnamese',
    xh = 'Xhosa',
    yi = 'Yiddish',
    yo = 'Yoruba',
    zu = 'Zulu',
  }

  export default function translate(query: string, opts?: IHTTPOptions): Promise<ITranslateHTTPResponse>
}
