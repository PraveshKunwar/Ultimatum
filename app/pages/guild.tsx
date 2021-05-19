import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useState, useEffect } from 'react';
import GuildID from "../components/GuildID";


const GuildPage: NextPage = (): JSX.Element => {
  const router = useRouter();
  const ID = router.query
  useEffect(() => {
    console.log(ID);
  }, [])
  return (
    <div className="guild-page">
      <GuildID />
    </div>
  )
}

export default GuildPage;
