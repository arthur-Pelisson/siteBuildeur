'use client'
import { Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import MaintenancePage from "./maintenance/page";
import { Divider } from "@mui/material";
import Link from "next/link";
import { ClassNames } from '@emotion/react';
import MediaPage from "./medias/page";

export default function Home() {
  return (
    <main className="flex flex-wrap min-h-screen">
          <Card className="!w-[350px] !min-h-[400px] h-[400px] m-8">
            <Link className="hover:text-sky-400" href="/maintenance">
              <Typography className="!text-center w-[100%]" variant="h5" component="h2">Maintenance</Typography>
            </Link>
            <Divider />
            <CardContent className="overflow-scroll !h-[400px]">
              <MaintenancePage />
            </CardContent>
          </Card>
          <Card className="!w-[350px] !min-h-[400px] h-[400px] m-8">
            <Link className="hover:text-sky-400" href="/medias">
              <Typography className="!text-center w-[100%]" variant="h5" component="h2">Médias</Typography>
            </Link>
            <Divider />
            <CardContent className="overflow-scroll !h-[380px]">
              <MediaPage />
            </CardContent>
          </Card>
    </main>
  );
}
