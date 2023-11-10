import Container from "@/components/shared/container";

const Navbar = () => {
  return (
    <Container className="flex items-center justify-between py-3.5">
      {/* logo  */}
      <span className="font-bold text-xl font-mono">Sweet</span>
    </Container>
  );
};

export default Navbar;
