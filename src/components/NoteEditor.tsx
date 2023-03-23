import React, { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';



type Props = { onSave: (note: { title: string; code: string }) => void }

function NoteEditor({ onSave }: Props) {
    const [code, codeSet] = useState<string>("");
    const [title, titleSet] = useState<string>("");
    return (
        <div className="card  bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">
                    <input type="text" placeholder='Note title'
                        className='input-primary input input-lg w-full font-bold'
                        value={title}
                        onChange={(e) => titleSet(e.currentTarget.value)}
                    />

                </h2>
                <CodeMirror
                    value={code}
                    width="500px"
                    height='30vh'
                    minHeight='30vh'
                    minWidth='100%'
                    extensions={[
                        markdown({ base: markdownLanguage, codeLanguages: languages })

                    ]}
                    onChange={(val) => codeSet(val)}
                    className="border border-gray-300"
                />
                <div className='card-actions justify-end'>
                    <button className='btn-primary btn'
                        onClick={() => {
                            console.log('code',code);
                            onSave({ title, code });
                            codeSet("");
                            titleSet("");

                        }}

                        disabled={title.trim().length === 0 || code.trim().length === 0}


                    >
                        Save
                    </button>

                </div>



            </div>
        </div>
    )
}

export default NoteEditor