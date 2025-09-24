import { useEffect, useState } from "react"
import Card from "../components/Card"
import { getMyTickets } from "../services/api"
import { QRCodeCanvas } from "qrcode.react"

export default function MyTickets() {
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadTickets() {
            try {
                const res = await getMyTickets()
                setTickets(res.items || [])
            } catch (e) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }
        loadTickets()
    }, [])

    if (loading) return <p>Cargando tickets...</p>
    if (error) return <p className="text-red-500">{error}</p>

    return (
        <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-2xl font-semibold mb-4">Mis Tickets</h1>
            {tickets.length === 0 ? (
                <p>No tienes tickets comprados.</p>
            ) : (
                tickets.map((t) => (
                    <Card key={t._id}>
                        <h2 className="text-lg font-semibold">{t.event?.title}</h2>
                        <p className="text-sm text-gray-400">{new Date(t.event?.date).toLocaleString()}</p>
                        <p><strong>Asiento:</strong> {t.seat?.row}-{t.seat?.col}</p>
                        <p><strong>Precio:</strong> ${t.pricePaid}</p>
                        <div className="mt-4 flex justify-center">
                            <QRCodeCanvas value={t.qrUrl || t._id} size={160} />
                        </div>
                    </Card>
                ))
            )}
        </div>
    )
}
