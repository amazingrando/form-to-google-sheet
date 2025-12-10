import clsx from 'clsx';
import { useFormState } from 'react-dom';
import { subscribeAction } from '../libs/subscribeAction';

const Form = () => {
  const [formState, formAction] = useFormState(subscribeAction, {
    success: false,
    errors: null,
  });

  return (
    <div>
      {!formState.success ? (
        <form
          action={formAction}
          className={clsx(
            'not-prose w-full max-w-md',
            'space-y-6 mb-16',
            'p-8 rounded-lg border-4 border-solid border-white/50',
            "bg-white text-blue-900"
          )}
          id="register"
        >
          <h2 className="font-bold text-3xl text-balance">
            Example of using a form to submit data to a Google Sheet
          </h2>

          {formState.errors && (
            <div
              className={clsx(
                'p-4 rounded',
                'bg-red-50 border-2 border-red-200',
                'text-red-800',
              )}
            >
              <p className="font-semibold mb-1">Error:</p>
              <ul className="list-disc list-inside">
                {formState.errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <label className="block space-y-2">
            <span className="text-base font-semibold leading-none uppercase">
              Your name
            </span>
            <input
              className="block w-full"
              type="text"
              id="name"
              name="name"
              placeholder="Luke Skywalker"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-base font-semibold leading-none uppercase">
              Your Email address
            </span>
            <input
              type="email"
              id="email"
              name="email"
              className="block w-full"
              placeholder="luke@skywalker.com"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-base font-semibold leading-none uppercase">
              Qualifications and experience, including portfolio link
            </span>
            <textarea
              id="links"
              name="links"
              rows="3"
              className="block w-full"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-base font-semibold leading-none uppercase">
              Fun fact about yourself
            </span>
            <textarea
              id="funfacts"
              name="funfacts"
              rows="3"
              className="block w-full"
            />
          </label>

          <div className="relative">
            <button
              type="submit"
              className={clsx(
                'inline-block rounded-lg',
                'text-lg font-bold text-white',
                'transition-all',
                'px-8 py-2 uppercase',
                'bg-blue-500 hover:bg-blue-600',
              )}
            >
              Apply
            </button>
          </div>
        </form>
      ) : (
        <div
          className={clsx(
            'not-prose w-full',
            'space-y-6 mb-16',
            'p-8 rounded border-4 border-solid border-whippedCream-dark',
          )}
        >
          <h2 className="font-bold text-leafyGreen-dark text-3xl text-balance !mt-0">
            Thank you for applying!
          </h2>
          <p>
            You will hear from us in the next business day or so.
          </p>
        </div>
      )}
    </div>
  );
};

export default Form;
