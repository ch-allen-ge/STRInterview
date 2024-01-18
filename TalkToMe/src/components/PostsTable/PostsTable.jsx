import './postsTableStyles.css';

import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import { strDelete } from '../../axios-config';
import EditIcon from '@mui/icons-material/Edit';
import NewOrEditPostModal from '../NewOrEditPostModal';
import { useState } from 'react';

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
    }
      
    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    //doesnt work for dates
    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
          const order = comparator(a[0], b[0]);
          if (order !== 0) {
            return order;
          }
          return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const headCells = [
        {
            id: 'username',
            numeric: false,
            disablePadding: false,
            label: 'Username',
        },
        {
          id: 'post_date',
          numeric: false,
          disablePadding: false,
          label: 'Post Date',
        },
        {
          id: 'source',
          numeric: false,
          disablePadding: false,
          label: 'Source',
        },
        {
          id: 'content',
          numeric: false,
          disablePadding: false,
          label: 'Content',
        },
        {
          id: 'topic',
          numeric: false,
          disablePadding: false,
          label: 'Topic',
        },
        {
            id: 'followers',
            numeric: true,
            disablePadding: false,
            label: 'Followers',
        },
        {
            id: 'following',
            numeric: true,
            disablePadding: false,
            label: 'Following',
        },
        {
          id: 'edited',
          numeric: false,
          disablePadding: false,
          label: 'Edited',
        },
    ];

    const EnhancedTableHead = (props) => {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
          props;
        const createSortHandler = (property) => (event) => {
          onRequestSort(event, property);
        };
      
        return (
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected === rowCount}
                  onChange={onSelectAllClick}
                  inputProps={{
                    'aria-label': 'select all posts',
                  }}
                />
              </TableCell>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  padding={headCell.disablePadding ? 'none' : 'normal'}
                  sortDirection={orderBy === headCell.id ? order : false}
                  style={{textAlign: 'center'}}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        );
    }

    const EnhancedTableToolbar = ({ allPosts, numSelected, selected, username, setSelected }) => {
        const [showEditModal, setShowEditModal] = useState(false);
        const [selectedPostDetails, setSelectedPostDetails] = useState({});

        const deleteSelected = async () => {
            //make sure user cant delete posts that dont belong to them
            for (const postIdToBeDeleted of selected) {
                const postedPost = allPosts.find((post) => post.post_id === postIdToBeDeleted);
                if (postedPost.username !== username) {
                    console.log('cant delete posts that are not yours!');
                    return;
                }
            }

            //delete selected posts
            const response = await strDelete('/deletePosts', {
                data: {
                    postsArray: selected
                }
            });

            if (response && response.status !== 200) {
                console.log('error deleting posts');
            }

            setSelected([]);
        }

        const openEditModal = () => {
            const selectedPost = allPosts.find((post) => post.post_id === selected[0]);
            setSelectedPostDetails(selectedPost);

            if (selectedPost.username === username) {
                setShowEditModal(true);
            } else {
                console.log('cannot edit posts that are not yours!');
            }
        }

        return (
          <>
            <Toolbar
                sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                    alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
                }}
            >
                {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
                ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Posts
                </Typography>
                )}

                {numSelected === 1 && (
                <Tooltip title="Edit">
                    <IconButton onClick={openEditModal}>
                    <EditIcon />
                    </IconButton>
                </Tooltip>
                )}
        
                {numSelected > 0 && (
                <Tooltip title="Delete">
                    <IconButton onClick={deleteSelected}>
                    <DeleteIcon />
                    </IconButton>
                </Tooltip>
                )}
            </Toolbar>

            <NewOrEditPostModal
                modalOpen={showEditModal}
                handleClose={() => {setShowEditModal(false)}}
                makeNewPost={false}
                postDetails={selectedPostDetails}
            />
          </>
        );
    }

const PostsTable = ({allPosts, username}) => {
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('post_date');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = allPosts.map((n) => n.post_id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allPosts.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(allPosts, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, allPosts],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar allPosts={allPosts} numSelected={selected.length} selected={selected} username={username} setSelected={setSelected}/>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={allPosts.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.post_id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.post_id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.post_id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      style={{textAlign: 'center'}}
                    >
                      {row.username}
                    </TableCell>
                    <TableCell align="right" style={{textAlign: 'center'}}>{row.post_date}</TableCell>
                    <TableCell align="right" style={{textAlign: 'center'}}>{row.source}</TableCell>
                    <TableCell align="right" style={{textAlign: 'center'}}>{row.content}</TableCell>
                    <TableCell align="right" style={{textAlign: 'center'}}>{row.topic}</TableCell>
                    <TableCell align="right" style={{textAlign: 'center'}}>{row.followers}</TableCell>
                    <TableCell align="right" style={{textAlign: 'center'}}>{row.following}</TableCell>
                    <TableCell align="right" style={{textAlign: 'center'}}>{String(row.edited ?? '')}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={allPosts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default PostsTable;