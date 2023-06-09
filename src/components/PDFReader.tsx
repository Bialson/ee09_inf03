import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import File from '../assets/ee09_2023.pdf';

import type { PDFDocumentProxy } from 'pdfjs-dist';
import { Box } from '@chakra-ui/react';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();

const options = {
	cMapUrl: 'cmaps/',
	standardFontDataUrl: 'standard_fonts/',
};
export const PDFReader = () => {
	const [numPages, setNumPages] = useState<number>();
	function onDocumentLoadSuccess({
		numPages: nextNumPages,
	}: PDFDocumentProxy) {
		setNumPages(nextNumPages);
	}

	return (
		<Box overflow={'scroll'}>
			<Document
				file={File}
				onLoadSuccess={onDocumentLoadSuccess}
				options={options}
			>
				{Array.from(new Array(numPages), (_, index) => (
					<Page
						key={`page_${index + 1}`}
						pageNumber={index + 1}
						scale={1.2}
					/>
				))}
			</Document>
		</Box>
	);
}
