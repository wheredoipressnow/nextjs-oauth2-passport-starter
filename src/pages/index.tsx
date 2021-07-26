import Layout from "@/components/Layout";
import { useUser } from "@/lib/user";

export default function Home() {
  const user = useUser();

  return (
    <Layout>
      {user && (
        <>        
          <div className="p-10 grid justify-items-center">
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-200">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 uppercase">
                  User Details
                </div>
                <p className="text-gray-700 text-base">
                  <pre>{user.claims.sub}</pre>
                  <pre>{user.claims.name}</pre>
                  <pre>updated at: {user.claims.updated_at}</pre>                  
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}
