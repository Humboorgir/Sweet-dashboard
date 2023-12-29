export default function Title({ openModal }: { openModal: { name: string; open: boolean } }) {
  return <h3 className="text-foreground text-xl tracking-tight mb-5">Configure {openModal.name}</h3>;
}
