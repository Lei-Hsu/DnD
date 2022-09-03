import type { NextPage } from "next";
import { useRouter } from 'next/router';

import styles from '@Style/Home.module.scss';

import { useAppDispatch } from '../hooks/hooks';
import { login } from '../redux/slices/account/accountSlice';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleClick = () => {
    dispatch(
      login({
        login: true,
        name: "test",
      })
    );
    router.push("/main");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-100">
      <div className="w-[500px] min-w-[300px] h-[500px] flex justify-center items-center shadow-lg">
        <button
          className="bg-blue-500 rounded px-10 py-4 text-zinc-100 hover:bg-blue-400"
          onClick={handleClick}
        >
          登入
        </button>
      </div>
    </div>
  );
};

export default Home;
