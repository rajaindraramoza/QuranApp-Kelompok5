import listEndpoint from '@/apis';
import { ListSurah } from '@/components';
import { MainLayout } from '@/layouts';
import list_surah from '@/list_surah';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Heading } from '@chakra-ui/react';

const HomePage = () => {
  const { locale } = useRouter();
  const [listSurah, setListSurah] = useState(list_surah);
  const handleSearch = (value) => {
    if (value.length === 0) {
      setListSurah(list_surah);
    } else {
      const filteredData = list_surah.filter((item) =>
        item.name.transliteration[locale]
          .toLowerCase()
          .split('-')
          .join(' ')
          .includes(value),
      );
      setListSurah(filteredData);
    }
  };
  const resetSearch = () => {
    setListSurah(list_surah);
  };
  return (
    <>
      <NextSeo
        description="Qur'an App merupakan website untuk Membaca, Menghapal, Mendengarkan Al-Qur'an secara online, digunakan untuk memenuhi projek akhir MatKul DIA"
        openGraph={{
          locale: locale,
          title: "Qur'an App",
          url: process.env.NEXT_PUBLIC_MAIN_URL,
          description:
            "Qur'an App merupakan website untuk Membaca, Menghapal, Mendengarkan Al-Qur'an secara online, digunakan untuk memenuhi projek akhir MatKul DIA",
          images: [
            {
              type: 'png',
              width: 1200,
              height: 630,
              url: process.env.NEXT_PUBLIC_MAIN_URL + 'logo.png',
              alt: 'logo',
            },
          ],
        }}
      />
      <MainLayout resetSearch={resetSearch} handleSearch={handleSearch}>
        {listSurah.length === 0 ? (
          <Heading
            as='h5'
            size='xl'
            textAlign='center'
            mb={10}
            h={500}
            justifyContent='center'
            alignItems='center'
            display='flex'
          >
            Surat Tidak Di temukan
          </Heading>
        ) : (
          <ListSurah data={listSurah} />
        )}
      </MainLayout>
    </>
  );
};

export default HomePage;