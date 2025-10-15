import OpenAI from "openai";
function App() {

const openai = new OpenAI({
  apiKey:import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const response = openai.responses.create({
  model: "gpt-4o-mini",
  input: "write a haiku about ai",
  store: true,
});

response.then((result) => console.log(result.output_text));
  return (
    <>
    <div className="flex flex-col bg-blue-100 h-[80vh]">
      <h2 className="p-4 font-semibold text-lg text-center">PC Builder</h2>
    </div>
    <div className="flex items-center"></div>
    </>
  )
}

export default App
