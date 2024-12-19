import { prisma } from '@/database/prisma';
import { auth } from '@/lib/auth';


// What exactly do we show here?
const Home = async () => {

  return (
    <div className="p-4 flex flex-col gap-y-6">
      <h2>Welcome to the most unassuming landing page!!</h2>
    </div>
  );
};

export default Home;
