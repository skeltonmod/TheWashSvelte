import Banner from "../../public/img/banner.fw.png";
export default function Home() {
  return (
    <div>
      <legend>The Wash</legend>
      <div class="inner">
        <center>
          <img
            class="center"
            src={Banner}
            alt="The Wash"
            style="width:40%; height: 40%"
          />
        </center>

        <p>Finally! It's Back!</p>
        <p>Rewritten with better code and more features.</p>
      </div>
    </div>
  );
}
