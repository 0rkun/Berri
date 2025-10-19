import Container from "./Container";
import Image from "next/image";
import payment from "@/images/payment.png";

const Footer = () => {
  return (
    <footer className="bg-lightBg text-sm">
      <Container className="py-5 flex items-center justify-between">
        <p className="text-gray-500">
          Copyright @ 2025{" "}
          <span className="text-darkBlue font-semibold">Orkun</span> all right
          reserved
        </p>
        <Image src={payment} alt="payment" className="w-65 object-cover " />
      </Container>
    </footer>
  );
};

export default Footer;
