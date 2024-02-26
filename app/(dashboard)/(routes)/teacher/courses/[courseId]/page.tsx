import React from 'react'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from 'lucide-react'
import { IconBadge } from '@/components/icon-badge'
import TitleForm from './_components/title-form'
import DescriptionForm from './_components/description-form'
import ImageForm from './_components/image-form'
import CategoryForm from './_components/catergory-form'
import PriceForm from './_components/price-form'
import AttachmentForm from './_components/attachment-form'
import ChaptersForm from './_components/chapters-form'

const CourseIdPage = async ({
    params
}: {
    params: { courseId: string }
}) => {

    const { userId } = auth()

    // redirect the user to the root page if they are not authenticated
    if (!userId) {
        redirect("/")
    }

    // fetch the course from the database
    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
            userId
        },
        include: { //extending the course attachments and chapters
            chapters: {
                orderBy: {
                    position: "asc"
                },
            },
            attachments: {
                orderBy: {
                    createdAt: "desc"
                },
            },
        },
    })

    // fetch the categories
    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        },
    });


    // redirect the root page if the course is not found
    if (!course) {
        redirect("/")
    }

    // array of required fields
    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId,
        course.chapters.some(chapter => chapter.isPublished),
    ]

    // calculate the number of fields left to complete
    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields}) fields completed`;

    return (
        <div className='p-6'>
            <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-y-2'>
                    <h1 className='font-medium text-2xl'>
                        Course Setup
                    </h1>
                    <span className='text-sm text-slate-700'>
                        Complete all fields {completionText} before going live!
                    </span>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
                <div>
                    <div className='flex items-center gap-x-2'>
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className='text-xl'>
                            Customize your course
                        </h2>
                    </div>

                    <TitleForm
                        initialData={course}
                        courseId={course.id}
                    />

                    <DescriptionForm
                        initialData={course}
                        courseId={course.id}
                    />

                    <ImageForm
                        initialData={course}
                        courseId={course.id}
                    />

                    <CategoryForm
                        initialData={course}
                        courseId={course.id}
                        options={categories.map((category) => ({
                            label: category.name,
                            value: category.id,
                        }))}
                    />
                </div>

                <div className="space-y-6">
                    <div>
                        <div className='flex items-center gap-x-2'>
                            <IconBadge icon={ListChecks} />
                            <h2 className='text-xl'>
                                Course Chapters
                            </h2>
                        </div>
                        <div>
                            <ChaptersForm
                                initialData={course}
                                courseId={course.id}
                            />
                        </div>
                    </div>

                    <div>
                        <div className='flex items-center gap-x-2'>
                            <IconBadge icon={CircleDollarSign } />
                            <h2 className='text-xl'>
                                Sell your course
                            </h2>
                        </div>
                        <div>
                            <PriceForm
                            initialData={course}
                            courseId={course.id}
                            />
                        </div>
                    </div>
                        {/* course attachments */}
                    <div>
                        <div className='flex items-center gap-x-2'>
                            <IconBadge icon={File} />
                            <h2 className='text-xl'>
                                Resources & Attachments
                            </h2>
                        </div>

                    <AttachmentForm
                        initialData={course}
                        courseId={course.id}
                    />
                    </div>


                </div>
            </div>
        </div>
    )
}

export default CourseIdPage