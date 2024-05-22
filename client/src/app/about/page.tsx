import ResponseForm from "@/components/ResponseForm";

const AboutUs: React.FC = (props) =>{
    return(
        <main className='flex justify-center h-[400px] mt-10'>
            <section className='w-[80%]'>
                <h3>
                    єЗбір - це проєкт у якому можна буде створити свій збір для допомоги військовим, або ж для особистих
                    потреб.
                </h3>
                <ResponseForm/>
            </section>

        </main>
    );
};

export default AboutUs;
