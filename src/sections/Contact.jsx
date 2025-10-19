import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Fragment, useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import { socials } from "../data";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const {
  VITE_EMAILJS_SERVICE_ID,
  VITE_EMAILJS_TEMPLATE_ID,
  VITE_EMAILJS_PUBLIC_KEY,
} = import.meta.env;

const Contact = () => {
  const formRef = useRef();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    emailjs
      .sendForm(
        VITE_EMAILJS_SERVICE_ID, // Replace with your actual service ID
        VITE_EMAILJS_TEMPLATE_ID, // Replace with your template ID
        formRef.current,
        VITE_EMAILJS_PUBLIC_KEY // Replace with your public key
      )
      .then(() => {
        toast.success("Message sent successfully! I’ll get back to you soon.");
        reset();
      })
      .catch(() => {
        toast.error("Oops! Failed to send the message. Please try again.");
      });
  };

  return (
    <section
      id="contact"
      className="py-20 px-10 md:px-20 bg-accent border-t border-secondary/50 scroll-mt-10 md:scroll-mt-0 scroll-smooth"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl md:text-4xl font-bold text-center mb-12 text-primary dark:text-primary">
          Contact Me
        </h2>

        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-6 bg-background dark:bg-background p-8 rounded-xl shadow-md"
        >
          <input
            type="text"
            placeholder="Your Name"
            {...register("user_name", { required: true })}
            className="py-3 px-4 rounded border-2 border-secondary/50 dark:border-secondary/50 text-primary dark:text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
          {errors.user_name && (
            <span className="text-red-500">Name is required</span>
          )}

          <input
            type="email"
            placeholder="Your Email"
            {...register("user_email", { required: true })}
            className="py-3 px-4 rounded border-2 border-secondary/50 dark:border-secondary/50 text-primary dark:text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
          {errors.user_email && (
            <span className="text-red-500">Email is required</span>
          )}

          <textarea
            placeholder="Your Message"
            rows="5"
            {...register("message", { required: true })}
            className="py-3 px-4 rounded border-2 border-secondary/50 dark:border-secondary/50 text-primary dark:text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50"
          ></textarea>
          {errors.message && (
            <span className="text-red-500">Message is required</span>
          )}

          {/* Hidden time field for email template */}
          <input
            type="hidden"
            value={new Date().toLocaleString()}
            {...register("time")}
          />

          <button
            type="submit"
            className="bg-accent dark:bg-accent text-primary py-3 rounded-lg shadow-lg hover:opacity-90 transition-all
            flex items-center gap-4 text-lg justify-center hover:scale-97 hover:bg-secondary cursor-pointer"
          >
            Send Message
            <MdSend size={30} />
          </button>
        </form>

        <div className="flex justify-center gap-6 mt-10 text-primary">
          {socials.map(({ name, mail, icon, url }, index) => (
            <Fragment key={index}>
              {name === "email" ? (
                <a
                  href={`mailto:${mail}`}
                  aria-label="Email"
                  className="hover:dark:text-secondary text-2xl bg-background p-2 rounded-full"
                >
                  {icon}
                </a>
              ) : (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="hover:dark:text-secondary text-2xl bg-background p-2 rounded-full"
                >
                  {icon}
                </a>
              )}
            </Fragment>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
