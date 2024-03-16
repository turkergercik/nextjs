import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { headers } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';
import { NextRequest } from 'next/server';
import categories from '@/data/categories';
import { Scroll } from '@/components/scroll';
async function getData() {
  const headersList = headers();
  const hg = headersList.get('host');
  const filePath = await fetch(`http://${hg}/api`, { cache: 'no-store' });
  const res = await filePath.json();
  return JSON.parse(res);
}

const Page = async ({ params, searchParams }) => {
  const t = await getData();
  const qw = t;
  const category = qw.filter((item) => item.slug === params.categoriename)[0];
  const products = category;

  return (
  <Scroll products={products}>

  </Scroll>





  );
};

export default Page;
