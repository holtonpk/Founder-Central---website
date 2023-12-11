import React, {useEffect} from "react";
import {Button} from "@/app/(client)/components/ui/button";
import {Icons} from "@/app/(client)/components/icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/(client)/components/ui/sheet";
import {Document, Page, pdfjs} from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const QuickLook = () => {
  const [showPreview, setShowPreview] = React.useState(false);
  const [numPages, setNumPages] = React.useState<number>();
  const [pageNumber, setPageNumber] = React.useState<number>(1);

  function onDocumentLoadSuccess({numPages}: {numPages: number}): void {
    onContainerResize();
    setNumPages(numPages);
  }

  const nextPage = () => {
    if (numPages && pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerDimensions, setContainerDimensions] = React.useState({
    width: 0,
    height: 0,
  });

  const onContainerResize = () => {
    if (containerRef.current) {
      const {width, height} = containerRef.current.getBoundingClientRect();
      setContainerDimensions({width, height});
    }
  };

  React.useEffect(() => {
    window.addEventListener("resize", onContainerResize);
    onContainerResize(); // Call on initial render

    return () => {
      window.removeEventListener("resize", onContainerResize);
    };
  }, []);
  const calculateScale = React.useCallback(() => {
    // Your existing logic for calculateScale
    if (containerDimensions.width === 0 || containerDimensions.height === 0) {
      return 1; // Default scale if container dimensions are not available
    }

    const containerRatio =
      containerDimensions.width / containerDimensions.height;

    if (!numPages) {
      return 1; // Default scale if numPages is not available
    }

    const pageDimensions = {
      width: 595, // Replace with the actual width of your PDF page
      height: 842, // Replace with the actual height of your PDF page
    };

    const pageRatio = pageDimensions.width / pageDimensions.height;

    setScale(
      containerRatio > pageRatio
        ? containerDimensions.height / pageDimensions.height
        : containerDimensions.width / pageDimensions.width
    );
    return containerRatio > pageRatio
      ? containerDimensions.height / pageDimensions.height
      : containerDimensions.width / pageDimensions.width;
  }, [containerDimensions, numPages]);
  // const calculateScale = () => {

  // };

  // useEffect(() => {
  //   calculateScale();
  // }, [containerDimensions, calculateScale]);

  const [scale, setScale] = React.useState<number>();
  useEffect(() => {
    calculateScale();
  }, [calculateScale]);

  const screenWidth = typeof window !== "undefined" && window.screen.width;

  return (
    <>
      <Button
        onClick={() => setShowPreview(true)}
        className="w-[90%]  bg-background md:bg-white border-none rounded-lg hover:text-[#4DA6E0] text-[#4DA6E0] mx-auto mt-4"
      >
        <Icons.showPassword className="h-5 w-5 mr-2" />
        Preview The Book
      </Button>

      {showPreview && (
        <Sheet open={showPreview} onOpenChange={setShowPreview}>
          <SheetContent
            side={(screenWidth as number) > 768 ? "right" : "bottom"}
            className="bg-white  z-[60]  p-4 "
          >
            <SheetHeader>
              <SheetTitle className="text-[#4DA6E0] w-[90%]">
                {" "}
                Quick look in The 50 Greatest Business Success Stories
              </SheetTitle>
            </SheetHeader>

            <div className="h-fit mt-3 w-full bg-[#EEF5FB] rounded-md flex flex-col p-3  ">
              <div
                ref={containerRef}
                className="relative w-full   aspect-[1/1.5] overflow-hidden "
              >
                <Document
                  className={"absolute h-full w-full "}
                  file="/book/book-preview.pdf"
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <Icons.spinner className="animate-spin h-10 w-10 mx-auto text-[#4DA6E0]" />
                    </div>
                  }
                >
                  <Page
                    pageNumber={pageNumber}
                    scale={scale}
                    height={842}
                    width={595}
                    className={"h-full"}
                    loading={
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                    }
                  />
                </Document>
              </div>
              <div className="flex mt-3 flex-row w-fit gap-20 mx-auto items-center  h-fit ">
                <Button
                  variant={"ghost"}
                  onClick={prevPage}
                  className="rounded-full aspect-square p-1 text-[#4DA6E0]"
                >
                  <Icons.chevronLeft className="h-6 w-6" />
                </Button>
                <span className="text-xl font-bold text-[#4DA6E0]">
                  {pageNumber}/{numPages}
                </span>
                <Button
                  variant={"ghost"}
                  onClick={nextPage}
                  className="rounded-full aspect-square p-1 text-[#4DA6E0]"
                >
                  <Icons.chevronRight className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default QuickLook;
