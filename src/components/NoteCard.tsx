import { Note } from '@prisma/client'
import React, { useState } from 'react'
import { RouterOutputs } from '~/utils/api'
import  ReactMarkdown from 'react-markdown'


type Props = {
    note: Note,
    onDelete: () => void
}

type NoteTmp = RouterOutputs["note"]["getAll"][0];

function NoteCard({ note, onDelete }: Props) {
    const [isExpanded, isExpandedSet] = useState<boolean>(true);
    return (
        <div className='card mt-5 border border-gray-300 bg-base-100 shadow-xl'>
            <div className={`collapse-arrow collapse  
        ${isExpanded ? "collapse-open" : ""}     
        `}
                onClick={() => isExpandedSet(!isExpanded)}
            >
                <div className='collapse-title text-xl font-bold'>{note.title}</div>
                <div className='collapse-content'>
                    <article className='prose lg:prose-xl'>
                        <ReactMarkdown>{note.content}</ReactMarkdown>

                    </article>

                </div>



            </div>
            <div className='card-actions justify-end m-2'>
                <button className='btn btn-warning px-5 btn-sm' 
                onClick={onDelete}>
                    Delete
                    
                </button>


            </div>

        </div>
    )
}

export default NoteCard