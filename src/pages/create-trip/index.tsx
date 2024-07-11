import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { InviteGuestsModal } from "./invite-guests-modal"
import { ConfirmTripModal } from "./confirm-trip-modal"
import { DestinationAndDateStep } from "./steps/destination-and-date-step"
import { InviteGuestsStep } from "./steps/invite-guests-step"

export function CreateTripPage() {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState([] as string[])

  const navigate = useNavigate()
  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(!isConfirmTripModalOpen)
  }

  function openGuestsInput() {
    setIsGuestsInputOpen(!isGuestsInputOpen)
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(!isGuestsModalOpen)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get("email")?.toString()
    if (!email || typeof (email) !== "string") return
    if (emailsToInvite.includes(email)) return
    setEmailsToInvite([...emailsToInvite, email])

    event.currentTarget.reset()
  }

  function removeEmailFromInvite(email: string) {
    setEmailsToInvite(emailsToInvite.filter(e => e !== email))
  }

  function createTrip(event: FormEvent<HTMLFormElement>){
    event.preventDefault()
    navigate('/trips/123')
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>
        <div className="space-y-4">
          <DestinationAndDateStep isGuestsInputOpen={isGuestsInputOpen} openGuestsInput={openGuestsInput} />
          {isGuestsInputOpen && (
            <InviteGuestsStep openGuestsModal={openGuestsModal} emailsToInvite={emailsToInvite} openConfirmTripModal={openConfirmTripModal} />
          )}
        </div>

        <p className="text-sm text-zin-500">Ao planejar sua viagem pela plann.er você automaticamente concorda
          com nossos <a href="#" className="text-sm text-zin-300 underline">termos de uso</a>  e <a href="#" className="text-sm text-zin-300 underline"> políticas de privacidade</a>.</p>
      </div>

      {isGuestsModalOpen && (
        <InviteGuestsModal openGuestsModal={openGuestsModal} emailsToInvite={emailsToInvite} addNewEmailToInvite={addNewEmailToInvite} removeEmailFromInvite={removeEmailFromInvite} />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal openConfirmTripModal={openConfirmTripModal} createTrip={createTrip} />
      )}


    </div>

  )
}

