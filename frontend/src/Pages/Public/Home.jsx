import Section1 from "../../components/Section1"
import Section2 from "../../components/Section2"
import axios from '../../axios';
import { useEffect, useState } from "react"
import { getErrorMessge } from "../../Utils/Helper";
import { toast } from "sonner";
function Home() {
  const [datum, setDatum] = useState(null);
  useEffect(() => {
    
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      const subdomain = window.location.hostname.split('.')[0]
      const data = await axios.get('/data/subdomain', {
        headers: {
          'Client-Subdomain': subdomain
        }
      });
      setDatum(data);
      console.log(datum);
    } catch (error) {
      const err = getErrorMessge(error);
      toast.error(err);
    }
    
  }
  return (
    <div className="">
      <Section1 />
      <Section2 />
    </div>
  )
}

export default Home
