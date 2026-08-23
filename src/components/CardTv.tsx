import {
  Card,
  CardFooter,
} from "@/components/ui/card"
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Play } from "lucide-react";
import Link from "@/components/SafeLink";
const imageNotFound = "/assets/imageNotFound.png";

type Props = {
  name?: string;
  logo_url?: string;
  preview_url?: string;
  embed_url?: string;
  category?: string;
}

const CardTv = ({ name, logo_url, preview_url, embed_url, category}: Props) => {
  const [previewSrc, setPreviewSrc] = useState(preview_url || imageNotFound);
  const [logoSrc, setLogoSrc] = useState(logo_url);

  useEffect(() => {
    setPreviewSrc(preview_url || imageNotFound);
  }, [preview_url]);

  useEffect(() => {
    setLogoSrc(logo_url);
  }, [logo_url]);

  return (
    <>
      <Link href={embed_url as string} target="_blank" rel="noopener noreferrer">
        <Card className=" md:w-[234px] hover:drop-shadow-2xl cursor-pointer bg-[#95a5a6]">
          <div className="relative">
            <img
              className='w-full h-[160px] object-cover rounded-t-md'
              src={previewSrc}
              alt="imagem de preview"
              onError={() => setPreviewSrc(imageNotFound)}
            />
            {logoSrc ? (
              <img
                src={logoSrc}
                className="w-16 absolute top-14 right-[82px]"
                alt="logo"
                onError={() => setLogoSrc(undefined)}
              />
            ) : null}
          </div>
          <CardFooter className="flex flex-col mt-5 bg-[#95a5a6]">
            <h1 className="self-start font-semibold text-white">{name}</h1>
            <p className="self-start uppercase font-semibold text-white">{category}</p>

            <Link className="mt-3 self-start" href={embed_url as string} target="_blank" rel="noopener noreferrer">
              <Button className="bg-blue-500 hover:bg-blue-500 px-6">
                <span className="mr-2"><Play size={14}  /></span>
                <span>Abrir</span>
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </Link>
    </>
  )
}

export default CardTv
