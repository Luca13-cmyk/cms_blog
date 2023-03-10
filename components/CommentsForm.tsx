import { useEffect, useRef, useState } from "react";
import Comment from "../model/Comment";
import { submitComment } from "../services";
import useCommentStore from "../store/commentStore";

interface IProps {
  slug: string;
}

function CommentsForm({ slug }: IProps) {
  const [error, setError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const commentEl = useRef<HTMLTextAreaElement>(null);
  const nameEl = useRef<HTMLInputElement>(null);
  const emailEl = useRef<HTMLInputElement>(null);
  const storeDataEl = useRef<HTMLInputElement>(null);

  const { addEmail, addName, removeEmail, removeName, email, name } =
    useCommentStore();

  useEffect(() => {
    nameEl.current!.value = name;
    emailEl.current!.value = email;
  }, [nameEl.current, emailEl.current]);

  const handleCommentSubmission = () => {
    setError(false);

    const { value: comment } = commentEl.current!;
    const { value: name } = nameEl.current!;
    const { value: email } = emailEl.current!;
    const { checked: storeData } = storeDataEl.current!;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj: Comment = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      addName(name);
      addEmail(email);
    } else {
      removeEmail();
      removeName();
    }

    setLoading(true);

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true);
      setLoading(false);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Leave a Reply
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentEl}
          placeholder="Comment"
          name="comment"
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-200 text-gray-700"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          ref={nameEl}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-200 text-gray-700"
          type="text"
          placeholder="Name"
          name="name"
        />
        <input
          ref={emailEl}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-200 text-gray-700"
          type="text"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            ref={storeDataEl}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
          />
          <label
            className="text-gray-500 cursor-pointer ml-2"
            htmlFor="storeData"
          >
            Save my e-mail and name for the next time I comment.
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">All fields are required.</p>
      )}
      <div className="mt-8 flex flex-col md:flex-row justify-between">
        <button
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
          type="button"
          disabled={loading}
          onClick={handleCommentSubmission}
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="text-xl font-semibold mt-3 text-green-500">
            Comment submitted for review
          </span>
        )}
      </div>
    </div>
  );
}

export default CommentsForm;
