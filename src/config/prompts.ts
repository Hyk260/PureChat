export const REFERENCE_PROMPT = `Please answer the question based on the reference materials

## Citation Rules:
- Please cite the context at the end of sentences when appropriate.
- Please use the format of citation number [^number] to reference the context in corresponding parts of your answer.
- If a sentence comes from multiple contexts, please list all relevant citation numbers, e.g., [^1][^2]. Remember not to group citations at the end but list them in the corresponding parts of your answer.

## My question is:

{question}

## Reference Materials:

{references}

Please respond in the same language as the user's question.
`
