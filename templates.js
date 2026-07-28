// =========================================
// AVEVA TXT Templates
// Author : CHUONG + ChatGPT
// =========================================

const Templates = {

    EXTRUSION: `NEW EQUIPMENT /{NAME}

NEW EXTRUSION /BODY

PROFILE /{PROFILE}

LENGTH {LENGTH}

WIDTH {WIDTH}

HEIGHT {HEIGHT}

RADIUS {RADIUS}

POS E {E} N {N} U {U}

ORI {ORI}`,



    BOX: `NEW EQUIPMENT /{NAME}

NEW BOX /BODY

XLEN {LENGTH}

YLEN {WIDTH}

ZLEN {HEIGHT}

POS E {E} N {N} U {U}

ORI {ORI}`,



    CYLI: `NEW EQUIPMENT /{NAME}

NEW CYLI /BODY

DIAM {WIDTH}

HEIG {HEIGHT}

POS E {E} N {N} U {U}

ORI {ORI}`,



    CONE: `NEW EQUIPMENT /{NAME}

NEW CONE /BODY

DBOT {WIDTH}

DTOP {RADIUS}

HEIG {HEIGHT}

POS E {E} N {N} U {U}

ORI {ORI}`

};
