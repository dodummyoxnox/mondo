import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const hiragana = [
  ["あ", "い", "う", "え", "お"],
  ["か", "き", "く", "け", "こ"],
  ["さ", "し", "す", "せ", "そ"],
  ["た", "ち", "つ", "て", "と"],
  ["な", "に", "ぬ", "ね", "の"],
  ["は", "ひ", "ふ", "へ", "ほ"],
  ["ま", "み", "む", "め", "も"],
  ["や", "", "ゆ", "", "よ"],
  ["ら", "り", "る", "れ", "ろ"],
  ["わ", "", "", "", "を"],
  ["ん", "", "", "", ""]
]

const katakana = [
  ["ア", "イ", "ウ", "エ", "オ"],
  ["カ", "キ", "ク", "ケ", "コ"],
  ["サ", "シ", "ス", "セ", "ソ"],
  ["タ", "チ", "ツ", "テ", "ト"],
  ["ナ", "ニ", "ヌ", "ネ", "ノ"],
  ["ハ", "ヒ", "フ", "ヘ", "ホ"],
  ["マ", "ミ", "ム", "メ", "モ"],
  ["ヤ", "", "ユ", "", "ヨ"],
  ["ラ", "リ", "ル", "レ", "ロ"],
  ["ワ", "", "", "", "ヲ"],
  ["ン", "", "", "", ""]
]

const particles = [
  ["は", "Topik kalimat", "わたしは がくせいです。"],
  ["が", "Subjek/fokus", "にほんごが わかります。"],
  ["を", "Objek", "ごはんを たべます。"],
  ["に", "Tujuan/waktu/lokasi", "がっこうに いきます。"],
  ["で", "Tempat aksi/alat", "はしで たべます。"],
  ["へ", "Arah tujuan", "にほんへ いきます。"]
]

function KanaGrid({ rows }: { rows: string[][] }) {
  return (
    <div className="grid gap-2">
      {rows.map((row, index) => (
        <div key={index} className="grid grid-cols-5 gap-2">
          {row.map((char, i) => (
            <div
              key={`${index}-${i}`}
              className="flex h-12 items-center justify-center rounded-2xl bg-slate-50 text-xl font-bold dark:bg-slate-950"
            >
              {char}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function AppendicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-slate-500">Appendices</p>
        <h1 className="text-3xl font-bold">Lampiran Belajar</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Ringkasan hiragana, katakana, partikel, dan pola dasar untuk pemula.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hiragana Dasar</CardTitle>
          </CardHeader>
          <CardContent>
            <KanaGrid rows={hiragana} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Katakana Dasar</CardTitle>
          </CardHeader>
          <CardContent>
            <KanaGrid rows={katakana} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Partikel Penting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {particles.map(([particle, meaning, example]) => (
            <div
              key={particle}
              className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
            >
              <p className="text-2xl font-bold">{particle}</p>
              <p className="mt-1 text-sm text-slate-500">{meaning}</p>
              <p className="mt-2 font-medium">{example}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
